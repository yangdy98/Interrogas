import React from 'react';
import { useNavigate } from 'react-router-dom';
import debug from 'sabio-debug';
import { Card, Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const _logger = debug.extend('Candidates');

function Candidate(prop) {
    const candidate = prop.candidate || {};
    const status = candidate.status;
    const navigate = useNavigate();

    const StatusColumn = (status) => {
        return (
            <span
                className={classNames('badge', {
                    'bg-success': status === 'Active' ? true : false,
                    'bg-danger': status === 'Inactive' ? true : false,
                    'bg-warning': status === 'Flagged' ? true : false,
                    'bg-dark': status === 'Removed' ? true : false,
                    'bg-info': status === 'Pending' ? true : false,
                })}>
                {status === 'Active'
                    ? 'Active'
                    : status === 'Inactive'
                    ? 'Inactive'
                    : status === 'Flagged'
                    ? 'Flagged'
                    : status === 'Removed'
                    ? 'Removed'
                    : 'Pending'}
            </span>
        );
    };

    _logger(prop);
    return (
        <>
            <Card>
                <Card.Body>
                    <Dropdown className="float-end" align="end">
                        <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                            <i className="mdi mdi-dots-horizontal"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                key={prop.candidate.id}
                                onClick={() => {
                                    navigate(`/candidates/update?${prop.candidate.id}`);
                                }}>
                                Edit Candidate Info
                            </Dropdown.Item>
                            <Dropdown.Item onClick={prop.onDeleteClicked} id={prop.candidate.id}>
                                Remove
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <div className="mt-3 text-center">
                        <img
                            src={candidate.avatarUrl}
                            width={250}
                            height={250}
                            alt=""
                            className="img-thumbnail avatar-lg rounded-circle"
                            onClick={prop.handleShow}
                        />
                        <h4>{candidate.allName}</h4>

                        <p className="text-muted mt-2 font-14">
                            <strong>{candidate.party}</strong>
                        </p>
                    </div>

                    <div className="mt-3">
                        <hr className="" />

                        <p className="mt-3 mb-1">
                            <strong>Surnames:</strong>
                            {`    ${candidate.surnames}`}
                        </p>

                        <p className="mt-1 mb-1">
                            <strong>Gender:</strong>
                            {`    ${candidate.genderType}`}
                        </p>

                        <p className="mt-1 mb-1">
                            <strong>Age:</strong>
                            {`    ${candidate.age}`}
                        </p>

                        <p className="mt-1 mb-1">
                            <strong>Party:</strong>
                            {`    ${candidate.party}`}
                        </p>

                        <p className="mt-1 mb-1">
                            <strong>Election Type:</strong>
                            {`    ${candidate.electionType}`}
                        </p>

                        <p className="mt-1 mb-1">
                            <strong>Is Elected?:</strong>
                            {`    ${candidate.isElected ? 'Elected' : 'Not Elected'}`}
                        </p>

                        <p className="mt-1 mb-2">
                            <strong>{`Status:    `}</strong>
                            {StatusColumn(status)}
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

Candidate.propTypes = {
    candidate: PropTypes.shape({
        name: PropTypes.string.isRequired,
        surnames: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
    }),
    onCandidateClick: PropTypes.func,
};

export default React.memo(Candidate);
