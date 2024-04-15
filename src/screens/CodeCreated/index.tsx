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
  const [openSnack, setOpenSnack] = useState(true)
  const contentRef = useRef(null);

  const valorExibicao = formaPagamento === 'reais' ? `R$ ${valor}` : formaPagamento === '%' ? `${valor} %` : valor;


  const tempoConvertido: string = tempoDuracao.split('-').reverse().join('-');
  
  const handleSuccessClose = () => {
    setOpenSnack(false);
  };

  const dadosCupom = {
    nome: `Nome do usuário: ${nome}`,
    cpf: `CPF: ${cpf}`,
    valor: `Valor: ${valorExibicao}`,
    tempoDuracao: `Data de expiração: ${tempoConvertido}`,
  };

  const footer = `
  O presente cupom é válido exclusivamente para utilização em nossas lojas físicas, não podendo, de forma alguma, ser utilizado como documento fiscal ou embasar qualquer argumento jurídico. Quaisquer dúvidas relacionadas ao uso deste cupom devem ser direcionadas à entidade emissora do mesmo.

  Os termos legais referentes ao uso deste cupom estão disponíveis em nosso site oficial. Ressaltamos que a nossa empresa não assume qualquer obrigação jurídica vinculada a este cupom, o qual não configura um título de crédito ou uma promessa de compra e venda, mas sim uma bonificação oferecida por nossa empresa.
  `;

  const generatePdf = () => {
    const pdf = new jsPDF();
    pdf.getFontList()
    
    // Definindo cor de fundo azul
    pdf.setFillColor(51, 102, 204); // Azul
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');

    // Definindo caixa branca com bordas arredondadas
    pdf.setFillColor(255, 255, 255); // Branco
    pdf.roundedRect(10, 10, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 20, 5, 5, 'F');

    // Título "Promo"
    pdf.setFont('Open-sans')
    pdf.setFontSize(24);
    pdf.setTextColor(0); // Cor do texto preto
    pdf.text('Promo', 85, 22, { align: 'center' });

    // Título "Code"
    pdf.setFontSize(24);
    pdf.setTextColor(0); // Cor do texto preto
    pdf.text('Code', 104, 29, { align: 'center' });

    pdf.setFont('Arial')

    // Faixa horizontal no código
    pdf.setDrawColor(0); // Cor da linha preta
    pdf.line(20, 30, pdf.internal.pageSize.getWidth() - 20, 30);

    // Adicionando QR Code
    const qrImage = new Image();
    qrImage.src = qrCode;
    const qrWidth = 100; // Largura do QR code
    const pdfWidth = pdf.internal.pageSize.getWidth(); // Largura do PDF
    const qrX = (pdfWidth - qrWidth) / 2; // Posição horizontal para centralizar o QR code
  
    pdf.addImage(qrImage, 'PNG', qrX, 30, qrWidth, 100);
  
    // Adicionando Código
    pdf.setFontSize(18);
    pdf.text(codigo, 105, 140, { align: 'center' });

    // Faixa horizontal no código
    pdf.setDrawColor(0); // Cor da linha preta
    pdf.line(20, 150, pdf.internal.pageSize.getWidth() - 20, 150);

    // Seção "Dados do Cupom"
    pdf.setFontSize(14);
    pdf.text('Dados do Cupom', 105, 160, { align: 'center' });

    // Dados do Cupom
    pdf.setFontSize(11);
    pdf.text(dadosCupom.nome, 20, 172);
    pdf.text(dadosCupom.cpf, 20, 182);
    pdf.text(dadosCupom.valor, 20, 192);
    pdf.text(dadosCupom.tempoDuracao, 20, 202);

    // Faixa horizontal no código
    pdf.setDrawColor(0); // Cor da linha preta
    pdf.line(20, 208, pdf.internal.pageSize.getWidth() - 20, 208);

    // Termos e condições do Cupom
    pdf.setFontSize(14);
    pdf.text('Termos e condições do Cupom', 105, 220, { align: 'center' });

    // Adicionando Rodapé
    pdf.setFontSize(11);
    const footerLines = footer.split('\n');
    let yPosition = 230;
    const lineHeight = 5;

    footerLines.forEach((line) => {
      const lineSplit = pdf.splitTextToSize(line, 180);
      lineSplit.forEach((split: string | string[]) => {
        pdf.text(split, 15, yPosition);
        yPosition += lineHeight;
      });
    });

    pdf.save('cupom.pdf');
};


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', backgroundColor: '#FBFBFF' }}>
      <Stack spacing={{ xs: 1, sm: 2 }} direction="column" alignItems="center">
        <Paper
          sx={{
            padding: 5,
            maxWidth: '90%',
            minHeight: '5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
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
          <Stack spacing={4}  style={{marginTop:'2rem'}}direction="row" justifyContent="center">
            <Button variant="contained" color="primary" onClick={generatePdf} sx={{ bgcolor: '#FFCB47', color: 'black',  '&:hover': { bgcolor: '#003049', color: 'white' } }}>
              Compartilhar
            </Button>
            <Button variant="contained" color="primary" component={NavLink} to="/home"  sx={{ bgcolor: '#003049', color: 'white', '&:hover': { bgcolor: '#FBFBFF', color: 'black' } }}>
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

