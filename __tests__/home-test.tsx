import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '../app/components/Header';

describe('<Header />', () => {
    
    it('should render the Header', () => {
        render(<Header />)

        expect(
            screen.getByRole('link', { name: /login/i })
        ).toBeInTheDocument()
    });
});

test('verifica se a variável de ambiente está acessível', () => {
    expect(process.env.NEXT_PUBLIC_FIREBASE_API_KEY).toBeDefined();
});
