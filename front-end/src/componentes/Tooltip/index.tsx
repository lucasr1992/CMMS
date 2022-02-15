import React from "react";
import { Container } from './styled';

interface TooltipProps {
    title: string;  // o title vai ser o texto do erro q vai aparecer quando passar o mouse por cima, e vai gerar um span
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {  // preciso declarar que vou usar a interface ToolTipProps  o children ja faz parte do código do framework ele ja entender children
    return(
        <Container className={className}>
            {children}
            <span>{title}</span>
        </Container>
    ); 
};

export default Tooltip;