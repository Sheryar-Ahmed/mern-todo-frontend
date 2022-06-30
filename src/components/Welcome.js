import React from 'react';
import styled from '@emotion/styled';

const CenterDiv = styled.div`
display: flex;
flex-direction:row ;
justify-content: center;
align-items: center;
width:100%;
min-width:20rem;
height: 90vh;
`;
const WelcomeDiv = styled.div`
width:90vw;
background: #1976d2;
display:flex;
flex-direction:column;
align-items: center;
justify-content: center;
padding:1rem 0rem;
border-radius:4px;
border:1px solid #1976d2;
p{
    color:white;
    font-size: 22px;
    font-weight: bold;
}
`;
const SmallText = styled.span`
font-size: 14px;
font-weight: bold;
color:white;
`;
const LargeText = styled.span`
font-size:30px;
font-weight: 800;
color:black;
`;

const Welcome = () => {
    return (
        <CenterDiv>
            <WelcomeDiv>
                <p>Welcome To Real Todos</p>
                <SmallText>TURN YOUR</SmallText>
                <LargeText>BUCKET LIST.</LargeText>
                <SmallText>INTO YOUR</SmallText>
                <LargeText>TODO LIST.</LargeText>
            </WelcomeDiv>
        </CenterDiv>
    )
}

export default Welcome