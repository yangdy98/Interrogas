import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Tab, Container, Modal } from 'react-bootstrap';
import Toastr from 'toastr';
import * as CandidatesService from '../../services/candidatesService';
import debug from 'sabio-debug';
import PageTitle from './PageTitle.jsx';
import Candidate from './Candidate';
import PropTypes from 'prop-types';
import FileUpload from '../../components/file/FileUpload';

// components
import FormInput from './FormInput.jsx';

const _logger = debug.extend('New Candidates');

const partyOption = () => {
    return (
        <>
            <option value="Institutional Revolutionary Party">Institutional Revolutionary Party</option>
            <option value="National Action Party">National Action Party</option>
            <option value="Democratic Revolutionary Party">Democratic Revolutionary Party</option>
            <option value="The Labor Party">The Labor Party</option>
            <option value="Green Ecological Party">Green Ecological Party</option>
            <option value="New Alliance Party">New Alliance Party</option>
            <option value="Citizen's Movement Party">{`Citizen's Movement Party`}</option>
            <option value="National Regeneration Party">National Regeneration Party</option>
            <option value="Social Encounter Party">Social Encounter Party</option>
            <option value="Juntos Hacemos Historia">Juntos Hacemos Historia</option>
            <option value="Partido Encuentro Solidario">Partido Encuentro Solidario</option>
            <option value="Turquis Party">Turquis Party</option>
            <option value="Silver Party">Silver Party</option>
            <option value="Bronze Party">Bronze Party</option>
            <option value="Diamond Party">Diamond Party</option>
            <option value="Platinum Party">Platinum Party</option>
            <option value="Water Party">Water Party</option>
            <option value="Fire Party">Fire Party</option>
            <option value="Wind Party">Wind Party</option>
            <option value="Earth Party">Earth Party</option>
            <option value="Big Party Coalition">Big Party Coalition</option>
            <option value="Small Party Coalition">Small Party Coalition</option>
            <option value="Old Party Coalition">Old Party Coalition</option>
            <option value="New Party Coalition">New Party Coalition</option>
        </>
    );
};

const PersonalInfo = ({ register, errors, control }) => {
    return (
        <>
            <h5 className="mb-4 text-uppercase">
                <i className="mdi mdi-account-circle me-1"></i> Candidate Info
            </h5>
            <Row>
                <Col md={6}>
                    <FormInput
                        label="Given Name"
                        type="text"
                        name="name"
                        placeholder="Enter given name"
                        containerClass={'mb-3'}
                        register={register}
                        key="name"
                        errors={errors}
                        control={control}
                    />
                </Col>
                <Col md={6}>
                    <FormInput
                        label="Surnames"
                        type="text"
                        name="surnames"
                        placeholder="Enter last name"
                        containerClass={'mb-3'}
                        register={register}
                        key="surnames"
                        errors={errors}
                        control={control}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormInput
                        label="Gender"
                        type="select"
                        name="genderType"
                        placeholder="Male or Female"
                        containerClass={'mb-3'}
                        register={register}
                        key="genderType"
                        errors={errors}
                        control={control}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </FormInput>
                </Col>
                <Col md={6}>
                    <FormInput
                        label="Age"
                        type="text"
                        name="age"
                        placeholder="Enter Age"
                        containerClass={'mb-3'}
                        register={register}
                        key="age"
                        errors={errors}
                        control={control}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mb-3">
                    <FormInput
                        label="Avatar Url"
                        type="text"
                        name="avatarUrl"
                        placeholder="Enter Avatar Url"
                        register={register}
                        key="avatarUrl"
                        errors={errors}
                        control={control}
                    />
                </Col>
                <Col md={6} className="mb-3">
                    <FormInput
                        label="Party"
                        type="select"
                        name="party"
                        placeholder="Enter Candidate Party"
                        register={register}
                        key="party"
                        errors={errors}
                        control={control}>
                        {partyOption()}
                    </FormInput>
                </Col>
            </Row>
            <Row>
                <Col md={4} className="mb-3">
                    <FormInput
                        label="Election"
                        type="select"
                        name="electionType"
                        placeholder="Enter Candidate Election"
                        register={register}
                        key="electionType"
                        errors={errors}
                        control={control}>
                        <option value="President">President</option>
                        <option value="Governor">Governor</option>
                        <option value="Senator">Senator</option>
                        <option value="Congressman">Congressman</option>
                        <option value="Mayor">Mayor</option>
                    </FormInput>
                </Col>

                <Col md={4} className="mb-3">
                    <FormInput
                        label="Status"
                        type="select"
                        name="statusType"
                        placeholder="Enter Candidate Status"
                        register={register}
                        key="statusType"
                        errors={errors}
                        control={control}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                        <option value="Flagged">Flagged</option>
                        <option value="Removed">Removed</option>
                    </FormInput>
                </Col>
                <Col md={4} className="mb-3">
                    <FormInput
                        label="Is Elected?"
                        type="select"
                        name="isElected"
                        placeholder="Enter Candidate Elected Status"
                        register={register}
                        key="isElected"
                        errors={errors}
                        control={control}>
                        <option value={false}>Not Elected</option>
                        <option value={true}>Elected</option>
                    </FormInput>
                </Col>
            </Row>
        </>
    );
};

const Settings = () => {
    const [cardData, setCardData] = useState({ candidate: [] });
    /*
     * form methods
     */
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const methods = useForm({
        defaultValues: {
            userId: '',
            name: '',
            surnames: '',
            genderType: '',
            age: '',
            avatarUrl: '',
            party: '',
            electionType: '',
            statusType: '',
            isElected: null,
            id: null,
        },
    });

    const location = useLocation();

    if (location.pathname === '/candidates/update' && methods.control._formValues.id === null) {
        const id = location.search.slice(1);
        _logger(id);
        const idCandidate = Number(id);
        CandidatesService.getCandidateById(idCandidate).then(onGetSuccess).catch(onGetError);
    }

    const manageUpload = (files) => {
        setValue('avatarUrl', files[0].url);
        setCardData((prevState) => {
            const pd = { ...prevState };
            pd.candidate = mapCard(methods.control._formValues);
            return pd;
        });
        onPostClick();
    };

    function onGetSuccess(response) {
        let newPageData = response.data.item;

        updateVal(newPageData);
        setCardData((prevState) => {
            const pd = { ...prevState };
            pd.candidate = mapCard(newPageData);
            return pd;
        });

        _logger('GET', response);
    }
    const mapCard = (candidate) => {
        return <Candidate candidate={candidate} manageCard={manageUpload} handleShow={handleShow} />;
    };

    function updateVal(data) {
        setValue('id', data.id);
        setValue('name', data.name);
        setValue('surnames', data.surnames);
        setValue('genderType', data.genderType);
        setValue('age', data.age);
        setValue('party', data.party);
        setValue('statusType', data.status);
        setValue('electionType', data.electionType);
        setValue('avatarUrl', data.avatarUrl);
        setValue('isElected', data.isElected);
    }

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
        setValue,
    } = methods;

    const onSubmit = () => {
        onPostClick();
    };

    function onPostClick() {
        methods.control._formValues.isElected = str2bool(methods.control._formValues.isElected);

        if (!methods.control._formValues.id) {
            CandidatesService.addCandidate(methods.control._formValues).then(onPostSuccess).catch(onError);
        } else if (methods.control._formValues.id) {
            CandidatesService.updateCandidate(methods.control._formValues.id, methods.control._formValues)
                .then(onUpdateSuccess)
                .catch(onError);
        }
    }

    function onPostSuccess(response) {
        _logger('Post', response);
        Toastr.success(`Post Candidate Success ${response.data.item}`);
        methods.values.id = response.data.item;
    }

    function onUpdateSuccess(response) {
        _logger('Update', response);
        Toastr.success(`Update Candidate Success `);
    }
    function onError(err) {
        _logger('Post or Update', err);
        Toastr.error('Post or Update error');
    }
    function onGetError(err) {
        _logger('Get', err);
        Toastr.error('Get error');
    }
    const str2bool = (value) => {
        if (value && typeof value === 'string') {
            if (value.toLowerCase() === 'true') return true;
            if (value.toLowerCase() === 'false') return false;
        }
        return value;
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Candidates', path: '/candidates' },
                    { label: 'New / Update Candidate', path: '/candidates', active: true },
                ]}
                title={location.pathname === '/candidates/update' ? 'Update Candidate' : 'Add Candidate'}
            />
            <Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Candidate Image File Upload</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group pt-2">
                            <label htmlFor="InputCoverPhoto">Candidate Image</label>

                            <FileUpload onFileChange={manageUpload} name="coverPhoto" />
                        </div>
                    </Modal.Body>
                </Modal>
                <Row>
                    <Col xl={4} lg={5}>
                        {cardData.candidate}
                    </Col>
                    <Col xl={8} lg={7}>
                        <Tab.Container defaultActiveKey="timeline">
                            <Card>
                                <Card.Body>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <PersonalInfo
                                            register={register}
                                            errors={errors}
                                            control={control}
                                            location={location.pathname}
                                        />
                                        <Row>
                                            <Col>
                                                <div className="text-start text-wrap">
                                                    <Link to="/candidates" className="btn btn-primary mt-2">
                                                        <i className="mdi mdi-arrow-left-bold"></i> Back to Candidates
                                                    </Link>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="text-end">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-success mt-2 justify-content-md-end">
                                                        <i className="mdi mdi-content-save"></i> Save
                                                    </button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                </Card.Body>
                            </Card>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

PersonalInfo.propTypes = {
    register: PropTypes.func,
    control: PropTypes.shape({}),
    errors: PropTypes.shape({}),
};

export default Settings;
