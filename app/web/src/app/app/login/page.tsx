import React from 'react';
import PropTypes from 'prop-types';
import {LoginForm} from "#/components/login-form";

const Page = props => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
};

export default Page;
