import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '../app/components/Header';

describe('<Header />', () => {
    it('should render the Header', () => {
        render(<Header />)

        expect(
            screen.getByRole('button', { name: /login/i })
        ).toBeInTheDocument()
    })
});