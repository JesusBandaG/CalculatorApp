import { useState, useRef } from 'react';

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {
    
    const [ numeroAnterior, setNumeroAnterior ] = useState('0');
    const [ numero, setNumero ] = useState('0');
    const ultimaOperacion = useRef<Operadores>();

    const limpiar = () => {
        setNumero('0');
        setNumeroAnterior('0');
    }

    const armarNumero = ( numeroTexto: string ) => {

        // No aceptar doble punto
        if ( numero.includes('.') && numeroTexto === '.' ) return;

        if ( numero.startsWith('0') || numero.startsWith('-0') ){
            // Punto decimal
            if ( numeroTexto === '.' ){
                setNumero( numero + numeroTexto);
            // Evaluar si es otro cero y hay un punto
            } else if ( numeroTexto === '0' && numero.includes('.') ) {
                setNumero( numero + numeroTexto );
            // Evaluar si es diferente de cero y no tiene un punto
            } else if ( numeroTexto !== '0' && !numero.includes('.') ) {
                setNumero( numeroTexto );
            // Evitar el 0000.0
            } else if ( numeroTexto === '0' && !numero.includes('.') ) {
                setNumero( numero);
            } else {
                setNumero( numero + numeroTexto );
            }
        } else {
            setNumero( numero + numeroTexto );
        }

    }

    const btnDelete = () => {
        if ( numero.startsWith('-') && numero.length === 2 ) {
            setNumero( '0' );
        } else if ( numero.length === 1 ) {
            setNumero( '0' );
        } else {
            setNumero( numero.slice(0, -1) );
        }
    }

    const positivoNegativo = () => {
        if ( numero.includes('-') ) {
            setNumero( numero.replace('-', '') );
        } else {
            setNumero( '-' + numero );
        }
    }

    const cambairNumPorAnterior = () => {
        if ( numero.endsWith('.') ) {
            setNumeroAnterior( numero.slice(0, -1) );
        } else {
            setNumeroAnterior( numero );
        }
        setNumero( '0' );
    }

    const btnDividir = () => {
        cambairNumPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
    }

    const btnMultiplicar = () => {
        cambairNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
    }

    const btnRestar = () => {
        cambairNumPorAnterior();
        ultimaOperacion.current = Operadores.restar;
    }

    const btnSumar = () => {
        cambairNumPorAnterior();
        ultimaOperacion.current = Operadores.sumar;
    }

    const calcular = () => {
        if ( numeroAnterior === '0' ) return;

        const num1 = Number( numero );
        const num2 = Number( numeroAnterior );

        switch ( ultimaOperacion.current ) {
            case Operadores.sumar:
                setNumero( `${ num1 + num2 }` );
                break;

            case Operadores.restar:
                setNumero( `${ num2 - num1 }` );
                break;

            case Operadores.multiplicar:
                setNumero( `${ num1 * num2 }` );
                break;
            
            case Operadores.dividir:
                if ( num1 === 0 ) {
                    setNumero( 'Inf' );
                } else {
                    setNumero( `${ num2 / num1 }` );
                }
                break;
        }

        setNumeroAnterior( '0' );
    }

    return {
        numeroAnterior,
        numero,
        limpiar,
        armarNumero,
        positivoNegativo,
        btnDelete,
        btnDividir,
        btnMultiplicar,
        btnSumar,
        btnRestar,
        calcular
    }
}
