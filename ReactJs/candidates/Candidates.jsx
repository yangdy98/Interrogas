// @flow
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';
import CandidateCards from './CandidateCards';
import CandidatesTable from './CandidatesTable';
import * as CandidatesService from '../../services/candidatesService';
import Candidate from './Candidate';
import PageTitle from './PageTitle.jsx';
import debug from 'sabio-debug';

const _logger = debug.extend('Candidates');
/* product column render */

// main component
function Candidates() {
    const [toggle, setToggle] = useState(false);
    const [pageData, setPageData] = useState({ arrayOfCandidates: [], candidatesComponent: [] });
    _logger('check data', pageData);

    useEffect(() => {
        _logger('ajax call');
        CandidatesService.getCandidates().then(onGetSuccess).catch(onGetError);
    }, []);
    function onGetSuccess(response) {
        let newPageData = response.data.item.pagedItems;
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfCandidates = newPageData;
            pd.arrayOfCandidates = pd.arrayOfCandidates.map(amendName);

            pd.candidatesComponent = pd.arrayOfCandidates.map(mapCandidate);
            return pd;
        });

        _logger('GET', response);
    }
    function amendName(arrayData) {
        const data = { ...arrayData, allName: `${arrayData.name} ${arrayData.surnames} ` };

        const output = data;

        return output;
    }
    function onGetError(err) {
        _logger('GET', err);
    }

    const mapCandidate = (aCandidate) => {
        _logger(aCandidate);
        return <Candidate candidate={aCandidate} key={aCandidate.id} onCandidateClick={onDeleteRequested}></Candidate>;
    };

    function onDeleteRequested(myCandidate) {
        _logger('delete requested', { myCandidate });

        const id = selectDeleteId(myCandidate);

        const handler = onDeleteRequestHandler(id);
        CandidatesService.deleteCandidate(id).then(handler).catch(onDeleteError);
    }

    function onDeleteError(err) {
        _logger('Delete', err);
    }

    const selectDeleteId = (data) => {
        const id = data.original !== undefined ? data.original.id : Number(data.target.id);
        return id;
    };

    const onDeleteRequestHandler = (idToBeDeleted) => {
        return () => {
            _logger('Delete', { idToBeDeleted });
            setPageData((prevState) => {
                const pd = { ...prevState };
                pd.arrayOfCandidates = [...pd.arrayOfCandidates];
                const index = pd.arrayOfCandidates.findIndex((Candidate) => {
                    let result = false;
                    if (Candidate.id === idToBeDeleted) {
                        result = true;
                    }

                    return result;
                });

                if (index >= 0) {
                    pd.arrayOfCandidates.splice(index, 1);
                    pd.candidatesComponent = pd.arrayOfCandidates.map(mapCandidate);
                }

                return pd;
            });
        };
    };

    const onToggleClicked = () => {
        setToggle((prevState) => {
            const result = !prevState;
            return result;
        });
    };

    _logger(toggle);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Home', path: '/apps/' },
                    { label: 'Candidates', path: '/apps/ecommerce/candidates', active: true },
                ]}
                title={'Candidates'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={5}>
                                    <Link to="new" className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Add Candidate
                                    </Link>
                                </Col>

                                <Col sm={7}>
                                    <div className="text-sm-end">
                                        <Button onClick={onToggleClicked} className="btn-primary mb-2">
                                            {toggle ? 'Table' : 'Cards'}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <div>
                                {toggle ? (
                                    <CandidateCards
                                        candidates={pageData.arrayOfCandidates}
                                        onDeleteRequested={onDeleteRequested}
                                    />
                                ) : (
                                    <CandidatesTable
                                        candidates={pageData.arrayOfCandidates}
                                        onDeleteRequested={onDeleteRequested}
                                    />
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Candidates;
