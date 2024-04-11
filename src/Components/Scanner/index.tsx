import { useState } from "react";
import styled from "styled-components";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Html5QrcodeScanner } from "html5-qrcode";

const CenteredCameraIcon = styled(CameraAltIcon)`
    display: block;
    margin: auto;
    font-size: 3rem;
    color: white; 
    background-color: #FBFBFF;
    border: 2px solid #003049; 
    border-radius: 50%; 
    padding: 10px; 
    cursor: pointer;
`;

function Scanner({ onScan }: { onScan: any }) {
    const [showScanner, setShowScanner] = useState(false);

    const startScanner = () => {
        setShowScanner(true);
        const scanner = new Html5QrcodeScanner('reader', {
            fps: 20,
            qrbox: {
                width: 250,
                height: 250,
            },
        }, false);

        scanner.render(success, error);

        function success(result: any) {
            scanner.clear();
            const codigoFinal = extrairCodigoFinal(result);
            onScan(codigoFinal);
        }

        function error(err: any) {
            console.warn(err)
        }
    };

    function extrairCodigoFinal(qrCode: any) {
        const partes = qrCode.split('/');
        const codigoFinal = partes[partes.length - 1];
        return codigoFinal;
    }

    return (
        <div style={{ textAlign: 'center' }}>
    {showScanner
        ? null
        : <CenteredCameraIcon onClick={startScanner} style={{ color: '#003049' }} />
    }
    <div id='reader'></div>
</div>

    );
}

export default Scanner;
