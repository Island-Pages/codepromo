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

  const valorExibicao = formaPagamento === 'reais' ? `R$ ${valor}` : `${valor} %`;

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
  Os termos legais quanto ao uso desse cupom, estão disponiveis no nosso site, lembramos que há qualquer obrigação juridica da Construcasa vinculada a esse cupom, cupom não configura título de crédito ou promessa de compra e venda, mas sim uma bonificação.
  `;

  const generatePdf = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(24);
    pdf.text('CUPOM', 105, 20, { align: 'center' });

    // Adicionando QR Code
    const qrImage = new Image();
    qrImage.src = qrCode;
    const qrWidth = 100; // Largura do QR code
    const pdfWidth = pdf.internal.pageSize.getWidth(); // Largura do PDF
    const qrX = (pdfWidth - qrWidth) / 2; // Posição horizontal para centralizar o QR code
  
    pdf.addImage(qrImage, 'PNG', qrX, 30, qrWidth, 100);
  

    // Adicionando Código
    pdf.setFontSize(12);
    pdf.text(codigo, 105, 150, { align: 'center' });

    pdf.setFontSize(14);
    pdf.text('Dados do Cupom', 105, 170, { align: 'center' });

    pdf.setFontSize(11);
    pdf.text(dadosCupom.nome, 20, 182);

    pdf.setFontSize(11);
    pdf.text(dadosCupom.cpf, 20, 192);

    pdf.setFontSize(11);
    pdf.text(dadosCupom.valor, 20, 202);

    pdf.setFontSize(11);
    pdf.text(dadosCupom.tempoDuracao, 20, 212);

    pdf.setFontSize(14);
    pdf.text('Termos e condições do Cupom', 105, 245, { align: 'center' });

    // Adicionando Rodapé
    pdf.setFontSize(11);
    const footerLines = footer.split('\n');
    let yPosition = 255;
    const lineHeight = 5;

    footerLines.forEach((line) => {
      const lineSplit = pdf.splitTextToSize(line, 180);
      lineSplit.forEach((split: string | string[]) => {
        pdf.text(split, 20, yPosition);
        yPosition += lineHeight;
      });
    });

    pdf.save('cupom.pdf');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
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
            <Button variant="contained" color="primary" onClick={generatePdf}>
              Compartilhar
            </Button>
            <Button variant="contained" color="primary" component={NavLink} to="/home">
              Voltar
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

