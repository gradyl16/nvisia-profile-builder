import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import PersonalInformation from './personal-information';

import '@testing-library/jest-dom';

describe('personal-information', () => {
    it('renders title and fields', () => {
        render(<PersonalInformation />);
        const headline = screen.getByRole('heading', { name: 'Personal Information'});
        expect(headline).toBeInTheDocument();
        const firstName = screen.getByRole('textbox', { name: 'First Name'});
        expect(firstName).toBeInTheDocument();
        const lastName = screen.getByRole('textbox', { name: 'Last Name'});
        expect(lastName).toBeInTheDocument();
        const yearsOfExperience = screen.getByRole('textbox', { name: 'Years of Experience'});
        expect(yearsOfExperience).toBeInTheDocument();
        const title = screen.getByRole('combobox', { name: 'Title'});
        expect(title).toBeInTheDocument();
        const continueBtn = screen.getByRole('button', { name: 'Continue'});
        expect(continueBtn).toBeInTheDocument();

    });

    it('fails validation due to data nor entered', async () => {
        render(<PersonalInformation />);
        const firstNameInput = screen.getByRole('textbox', { name: 'First Name' });
        await userEvent.type(firstNameInput, 'testing input');

        const button = screen.getByRole('button', { name: "Continue" });
        await userEvent.click(button);
        
        const lastName = screen.getByRole('textbox', { name: 'Last Name'});
        expect(lastName).toBeInvalid();

        const yearsOfExperience = screen.getByRole('textbox', { name: 'Years of Experience'});
        expect(yearsOfExperience).toBeInvalid();

        // todo: fix the code below so test passes - stretch goal
        // const title = screen.getByRole('combobox', { name: 'Title'});
        // expect(title).toBeInvalid(); 

    });
});
