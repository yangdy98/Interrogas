import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import debug from 'sabio-debug';
import Candidate from './Candidate';
import PropTypes from 'prop-types';
// components

const _logger = debug.extend('Candidates');

// ChatProfile

const CandidateCards = (prop) => {
    const Candidates = prop.candidates || {};

    const mapCandidate = (aCandidate) => {
        _logger(aCandidate);

        return (
            <Col xxl={{ span: 3, order: 2 }} xl={{ span: 6, order: 1 }}>
                <Candidate
                    candidate={aCandidate}
                    key={aCandidate.id}
                    onDeleteClicked={prop.onDeleteRequested}></Candidate>
            </Col>
        );
    };

    return (
        <>
            <Container fluid="true">
                <Row>{Candidates.map(mapCandidate)}</Row>
            </Container>
        </>
    );
};

CandidateCards.propTypes = {
    candidates: PropTypes.shape([]).isRequired,
    onDeleteRequested: PropTypes.func,
};

export default CandidateCards;
