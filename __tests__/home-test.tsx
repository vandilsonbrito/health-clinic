import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import BtnLogIn from '../app/components/landingPage/BtnLogIn';

describe('<BtnLogIn />', () => {

    it('mostra o link de login apontando para /sign-in', () => {
        render(<BtnLogIn />)

        expect(
            screen.getByRole('link', { name: /entrar/i })
        ).toHaveAttribute('href', '/sign-in')
    });
});

test('verifica se a variável de ambiente está acessível', () => {
    expect(process.env.NEXT_PUBLIC_FIREBASE_API_KEY).toBeDefined();
});
