import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import logoPostoSrc from '../../assets/logo_cinza.png';
import logoConstrucasaSrc from '../../assets/construcasa.png';

const Title = styled('div')(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  fontFamily: 'Arial',
}));

const CodeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));
export default function CodeCreated() {
  const location = useLocation();
  const { qrCode, codigo, tempoDuracao, nome, cpf, valor, formaPagamento } = location.state;
  const [openSnack, setOpenSnack] = useState(true);
  const contentRef = useRef(null);

  const handleSuccessClose = () => {
    setOpenSnack(false);
  };

  function reverterFormatoData(data: typeof tempoDuracao) {
    var partesData = data.split('-');
    var ano = partesData[0];
    var mes = partesData[1];
    var dia = partesData[2];
    return dia + '/' + mes + '/' + ano;
  }

  const valorExibicao =
    formaPagamento === 'reais' ? `R$ ${valor}` : formaPagamento === 'porcentagem' ? `${valor}%` : valor;

  const extrairNomeFormatado = (nomeCompleto: string) => {
    var partesNome = nomeCompleto.split(' ');
    var primeiroNome = partesNome[0] + ' ' + partesNome[1];
    return primeiroNome;
  };

  const footer1 = `
  O presente cupom é válido exclusivamente para utilização em nossas lojas físicas, não podendo, de forma alguma, ser utilizado como documento fiscal ou embasar qualquer argumento jurídico. Quaisquer dúvidas relacionadas ao uso deste cupom devem ser direcionadas à entidade emissora do mesmo.`;

  const footer2 = `
  Os termos legais referentes ao uso deste cupom estão disponíveis em nosso site oficial. Ressaltamos que a nossa empresa não assume qualquer obrigação jurídica vinculada a este cupom, o qual não configura um título de crédito ou uma promessa de compra e venda, mas sim uma bonificação oferecida por nossa empresa.
  `;

  const generatePdf = () => {
    const pdf = new jsPDF();

    pdf.setFont('Courier', 'bold');

    // Definindo cor de fundo branca
    pdf.setFillColor(255, 255, 255); // Branco
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');

    // Definindo retângulo azul alinhado ao topo com margens
    const rectWidth = pdf.internal.pageSize.getWidth() * 0.95;
    const rectHeight = pdf.internal.pageSize.getHeight() * 0.25; // Aumentando a altura do retângulo
    const rectX = (pdf.internal.pageSize.getWidth() - rectWidth) / 2;
    const marginTop = 0.015 * pdf.internal.pageSize.getHeight();
    pdf.setFillColor(0, 48, 73); // Azul
    pdf.rect(rectX, marginTop, rectWidth, rectHeight, 'F');

    // Adicionando QR Code
    const qrImage = new Image();
    qrImage.src = qrCode;
    const qrSize = Math.min(rectHeight * 0.9, rectWidth * 0.25); // Tamanho do QR code limitado pela altura ou largura do retângulo
    const qrX = rectX + rectWidth - qrSize - rectWidth * 0.05; // Alinhado à direita com uma margem de 5%
    const qrY = marginTop + (rectHeight - qrSize) / 2; // Centralizando verticalmente dentro do retângulo
    pdf.addImage(qrImage, 'PNG', qrX, qrY, qrSize, qrSize);

    // Adicionando Código
    pdf.setFontSize(18);
    pdf.setTextColor(255, 203, 71);
    const codigoY = qrY + qrSize + 7;
    pdf.text(codigo, qrX + rectWidth * 0.05, codigoY);

    // Adicionando texto "CUPOM DE"
    const cupomDeText = 'CUPOM DE';
    pdf.setFontSize(50);
    pdf.setTextColor(255, 255, 255);
    const cupomDeX = rectX + rectWidth * 0.05;
    pdf.text(cupomDeText, cupomDeX, codigoY - 50);

    // Adicionando texto "DESCONTO:"
    const descontoText = 'DESCONTO';
    pdf.setTextColor(255, 203, 71);
    const descontoX = rectX + rectWidth * 0.05;
    pdf.text(descontoText, descontoX, codigoY - 35);

    // Adicionando Valor
    const tamanhoFonte = valorExibicao === valor ? 20 : 35; // Reduzindo o tamanho da fonte para 'valor'
    const valorX = rectX + rectWidth * 0.05;
    let valorText = valorExibicao === valor ? valor : valorExibicao; // Inicializando com valor vazio

    if (valorExibicao === valor && valor.length > 25) {
      const parte1 = valor.substring(0, 25);
      let parte2 = valor.substring(25);
      if (parte2.length > 25) {
        parte2 = `${parte2.substring(0, 22)}...`;
      }
      valorText = `${parte1}\n${parte2}`;
      // Ajuste para manter a mesma coordenada horizontal (x) para a segunda linha
      const valorXSegundaLinha = valorX; // Mantém a mesma coordenada horizontal (x) para a segunda linha
      pdf.setFontSize(tamanhoFonte);
      pdf.setTextColor(255, 255, 255);
      pdf.text(parte1, valorX, codigoY - 25);
      pdf.text(parte2, valorXSegundaLinha, codigoY - 20); // Utiliza a mesma coordenada horizontal (x) da primeira linha
    } else {
      pdf.setFontSize(tamanhoFonte);
      pdf.setTextColor(255, 255, 255);
      pdf.text(valorText, valorX, codigoY - 25);
    }

    // Adicionando Nome
    pdf.setFontSize(24);
    pdf.setTextColor(255, 203, 71);
    const textNome = `NOME:${extrairNomeFormatado(nome)}`;
    const textNomeX = rectX + rectWidth * 0.01;
    pdf.text(textNome, textNomeX, codigoY - 10);

    // Adicionando CPF
    const textCPF = `CPF:${cpf}`;
    const textX = rectX + rectWidth * 0.01;
    pdf.text(textCPF, textX, codigoY);

    // Adicionando texto "TERMOS E USOS DO CUPOM"
    pdf.setFontSize(20);
    pdf.setTextColor(0, 0, 0); // Preto
    const termosText = 'TERMOS E CONDIÇÕES DO CUPOM';
    const termosX = pdf.internal.pageSize.getWidth() / 2;
    const termosY = 90;
    pdf.text(termosText, termosX, termosY, { align: 'center' });

    // Adicionando texto "Válido até: [data]"
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    const dataText = `Válido até: ${reverterFormatoData(tempoDuracao)}`;
    const dataX = pdf.internal.pageSize.getWidth() / 2;
    const dataY = termosY + 5;
    pdf.text(dataText, dataX, dataY, { align: 'center' });

    // Adicionando footer1
    pdf.setFontSize(9);
    pdf.setTextColor(0, 0, 0);
    const footerX1 = pdf.internal.pageSize.getWidth() / 2;
    let footerY1 = dataY + 5;

    // Dividindo o texto do footer em linhas justificadas
    const lines1 = pdf.splitTextToSize(footer1, pdf.internal.pageSize.getWidth() - 20);

    // Desenhando cada linha do footer1
    lines1.forEach((line) => {
      pdf.text(line, footerX1, footerY1, { align: 'center' });
      footerY1 += 4; // Avançando para a próxima linha
    });

    // Adicionando footer2
    pdf.setFontSize(9);
    pdf.setTextColor(0, 0, 0); // Preto
    const footerX2 = pdf.internal.pageSize.getWidth() / 2;
    let footerY2 = footerY1 + 1; // Adicionando um espaço entre os parágrafos

    // Dividindo o texto do footer em linhas justificadas
    const lines2 = pdf.splitTextToSize(footer2, pdf.internal.pageSize.getWidth() - 20);

    // Desenhando cada linha do footer2
    lines2.forEach((line) => {
      pdf.text(line, footerX2, footerY2, { align: 'center' });
      footerY2 += 4; // Avançando para a próxima linha
    });

    // Calculando a largura das metades da página
    const halfWidth = pdf.internal.pageSize.getWidth() / 2;

    // Adicionando a primeira imagem à esquerda
    const logoPosto = new Image();
    logoPosto.src = logoPostoSrc;
    const logoPostoSize = Math.min(rectHeight * 0.9, rectWidth * 0.25);
    const logoPostoX = halfWidth / 2 - logoPostoSize / 2;
    const logoPostoY = 120;
    pdf.addImage(logoPosto, 'PNG', logoPostoX, logoPostoY, logoPostoSize, logoPostoSize);

    // Adicionando a segunda imagem à direita
    const logoConstrucasa = new Image();
    logoConstrucasa.src = logoConstrucasaSrc;
    const logoConstrucasaSize = Math.min(rectHeight * 0.9, rectWidth * 0.25);
    const logoConstrucasaX = halfWidth + halfWidth / 2 - logoConstrucasaSize / 2;
    const logoConstrucasaY = 120;
    pdf.addImage(logoConstrucasa, 'PNG', logoConstrucasaX, logoConstrucasaY, logoConstrucasaSize, logoConstrucasaSize);

    pdf.save('cupom.pdf');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        backgroundColor: '#FBFBFF',
      }}
    >
      <Stack spacing={{ xs: 1, sm: 2 }} direction="column" alignItems="center">
        <Paper
          sx={{
            padding: 5,
            maxWidth: '90%',
            minHeight: '5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
          }}
          ref={contentRef}
        >
          <NavLink to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
            <IconButton color="inherit" aria-label="Voltar" sx={{ position: 'absolute', left: '4rem', top: '6rem' }}>
              <ArrowBackIcon />
            </IconButton>
          </NavLink>
          <Title>CUPOM</Title>
          <CodeContainer>
            <img src={qrCode} alt="QR Code" />
            <div>{codigo}</div>
          </CodeContainer>
          <Stack spacing={4} style={{ marginTop: '2rem' }} direction="row" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={generatePdf}
              sx={{ bgcolor: '#FFCB47', color: 'black', '&:hover': { bgcolor: '#003049', color: 'white' } }}
            >
              Compartilhar
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={NavLink}
              to="/home"
              sx={{ bgcolor: '#003049', color: 'white', '&:hover': { bgcolor: '#FBFBFF', color: 'black' } }}
            >
              Sair
            </Button>
          </Stack>
        </Paper>
      </Stack>
      <Snackbar open={openSnack} autoHideDuration={2500} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          Cupom cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
}
