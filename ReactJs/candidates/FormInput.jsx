// @flow
import React from 'react';
import { Form } from 'react-bootstrap';

import PropTypes from 'prop-types';

/* Password Input */

const FormInput = ({
    label,
    type,
    name,
    placeholder,
    register,
    errors,
    className,
    labelClassName,
    containerClass,
    refCallback,
    children,
    ...otherProps
}) => {
    // handle input type
    const comp = type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input';

    return (
        <>
            {type === 'hidden' ? (
                <input type={type} name={name} {...(register ? register(name) : {})} {...otherProps} />
            ) : (
                <>
                    {type === 'password' ? (
                        <>
                            <Form.Group className={containerClass}>
                                {label ? (
                                    <>
                                        {' '}
                                        <Form.Label className={labelClassName}>{label}</Form.Label> {children}{' '}
                                    </>
                                ) : null}

                                {errors && errors[name] ? (
                                    <Form.Control.Feedback type="invalid" className="d-block">
                                        {errors[name]['message']}
                                    </Form.Control.Feedback>
                                ) : null}
                            </Form.Group>
                        </>
                    ) : (
                        <>
                            {type === 'select' ? (
                                <>
                                    <Form.Group className={containerClass}>
                                        {label ? <Form.Label className={labelClassName}>{label}</Form.Label> : null}

                                        <Form.Select
                                            type={type}
                                            label={label}
                                            name={name}
                                            id={name}
                                            ref={(r) => {
                                                if (refCallback) refCallback(r);
                                            }}
                                            comp={comp}
                                            className={className}
                                            isInvalid={errors && errors[name] ? true : false}
                                            {...(register ? register(name) : {})}
                                            {...otherProps}>
                                            {children}
                                        </Form.Select>

                                        {errors && errors[name] ? (
                                            <Form.Control.Feedback type="invalid">
                                                {errors[name]['message']}
                                            </Form.Control.Feedback>
                                        ) : null}
                                    </Form.Group>
                                </>
                            ) : (
                                <>
                                    {type === 'checkbox' || type === 'radio' ? (
                                        <>
                                            <Form.Group className={containerClass}>
                                                <Form.Check
                                                    type={type}
                                                    label={label}
                                                    name={name}
                                                    id={name}
                                                    ref={(r) => {
                                                        if (refCallback) refCallback(r);
                                                    }}
                                                    className={className}
                                                    isInvalid={errors && errors[name] ? true : false}
                                                    {...(register ? register(name) : {})}
                                                    {...otherProps}
                                                />

                                                {errors && errors[name] ? (
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors[name]['message']}
                                                    </Form.Control.Feedback>
                                                ) : null}
                                            </Form.Group>
                                        </>
                                    ) : (
                                        <Form.Group className={containerClass}>
                                            {label ? <Form.Label className={labelClassName}>{label}</Form.Label> : null}

                                            <Form.Control
                                                type={type}
                                                placeholder={placeholder}
                                                name={name}
                                                id={name}
                                                as={comp}
                                                ref={(r) => {
                                                    if (refCallback) refCallback(r);
                                                }}
                                                className={className}
                                                isInvalid={errors && errors[name] ? true : false}
                                                {...(register ? register(name) : {})}
                                                {...otherProps}
                                                autoComplete={name}>
                                                {children ? children : null}
                                            </Form.Control>

                                            {errors && errors[name] ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors[name]['message']}
                                                </Form.Control.Feedback>
                                            ) : null}
                                        </Form.Group>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};

FormInput.propTypes = {
    label: PropTypes,
    type: PropTypes.isRequired,
    name: PropTypes.isRequired,
    placeholder: PropTypes,
    register: PropTypes.isRequired,
    errors: PropTypes,
    className: PropTypes,
    labelClassName: PropTypes,
    containerClass: PropTypes,
    refCallback: PropTypes,
    children: PropTypes,
};

export default FormInput;
