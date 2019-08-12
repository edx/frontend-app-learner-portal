import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import MediaQuery from 'react-responsive';
import { breakpoints, StatusAlert } from '@edx/paragon';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Layout, LayoutConsumer, withAuthentication } from '../../common';
import { MainContent, Sidebar } from '../../common/Layout';
import { fetchUserProgramEnrollments } from '../user-program-enrollments';

import ProgramMainContent from './main-content/MainContent';
import ProgramSidebar from './sidebar/Sidebar';
import Hero from './Hero';

import './styles/ProgramPage.scss';

class ProgramPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasProgramAccess: false,
    };
  }

  componentDidMount() {
    this.props.fetchUserProgramEnrollments();
  }

  componentDidUpdate(prevProps) {
    const { enrolledPrograms } = this.props;

    if (enrolledPrograms && enrolledPrograms !== prevProps.enrolledPrograms) {
      this.validateProgramAccess(enrolledPrograms);
    }
  }

  validateProgramAccess = (programs) => {
    const { programUUID } = this.props.pageContext;
    if (programs.map(program => program.uuid).includes(programUUID)) {
      this.setState({
        hasProgramAccess: true,
      });
    }
  }

  renderError = () => (
    <div className="container my-4">
      <StatusAlert
        alertType="danger"
        dialog={
          <div className="d-flex">
            <div>
              <FontAwesomeIcon className="mr-2" icon={faExclamationTriangle} />
            </div>
            <div>
              You are not authorized to view this page.
              This page is reserved for Masters students only.
              You may access public edX courses on
              {' '}
              <a className="alert-link" href="https://edx.org">edX.org</a>.
              If you are a Masters student and believe you should have access,
              please contact your advisor at the university for further assistance.
            </div>
          </div>
        }
        dismissible={false}
        open
      />
    </div>
  );

  render() {
    const { hasProgramAccess } = this.state;
    const { pageContext, isLoading } = this.props;
    const {
      programUUID,
      programName,
      programDocuments,
      programBranding,
      externalProgramWebsite,
    } = pageContext;

    return (
      <Layout pageContext={pageContext}>
        <>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: 200 }}>
              <div className="spinner-border text-primary" role="status">
                <div className="sr-only">Loading program enrollments...</div>
              </div>
            </div>
          ) : (
            <>
              {hasProgramAccess ? (
                <>
                  <Helmet title={programName} />
                  <Hero
                    programTitle={programName}
                    organizationLogo={{
                      url: programBranding.organization_logo.url,
                      alt: programBranding.organization_logo.alt,
                    }}
                    textureImage={programBranding.texture_image}
                    coverImage={programBranding.cover_image}
                    bannerBorderColor={programBranding.banner_border_color}
                  />
                  <div className="container py-5">
                    <div className="row">
                      <MainContent>
                        <ProgramMainContent
                          programDocuments={programDocuments}
                          programUUID={programUUID}
                        />
                      </MainContent>
                      <MediaQuery minWidth={breakpoints.large.minWidth}>
                        {matches => matches && (
                        <Sidebar>
                          <ProgramSidebar
                            programDocuments={programDocuments}
                            externalProgramWebsite={externalProgramWebsite}
                          />
                        </Sidebar>
                      )}
                      </MediaQuery>
                    </div>
                  </div>
                </>
              ) : (
                this.renderError()
              )}
            </>
          )}
        </>
      </Layout>
    );
  }
}

ProgramPage.propTypes = {
  pageContext: PropTypes.shape({
    programName: PropTypes.string.isRequired,
    programSlug: PropTypes.string.isRequired,
    programUUID: PropTypes.string.isRequired,
    programBranding: PropTypes.shape({
      cover_image: PropTypes.string,
      banner_border_color: PropTypes.string,
      texture_image: PropTypes.string,
      organization_logo: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
      }),
    }),
    programDocuments: PropTypes.shape({
      display: PropTypes.bool,
      header: PropTypes.string,
      documents: PropTypes.arrayOf(PropTypes.shape({
        display_text: PropTypes.string,
        document: PropTypes.string,
        url: PropTypes.string,
      })),
    }),
    externalProgramWebsite: PropTypes.shape({
      header: PropTypes.string,
      link: PropTypes.shape({
        display_text: PropTypes.string,
        url: PropTypes.string,
      }),
      display: PropTypes.bool,
      description: PropTypes.string,
    }),
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchUserProgramEnrollments: PropTypes.func.isRequired,
  enrolledPrograms: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  })),
};

ProgramPage.defaultProps = {
  enrolledPrograms: null,
};

const mapStateToProps = state => ({
  isLoading: state.enrolledPrograms.loading,
  enrolledPrograms: state.enrolledPrograms.data,
  error: state.enrolledPrograms.error,
});

const mapDispatchToProps = dispatch => ({
  fetchUserProgramEnrollments: () => dispatch(fetchUserProgramEnrollments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(ProgramPage));
