import React from 'react';
import MediaQuery from 'react-responsive';
import { breakpoints } from '@edx/paragon';

import Hero from '../Hero/Hero';
import MainContent from './MainContent';
import Sidebar from './Sidebar';
import withAuthentication from '../withAuthentication';
import Layout from '../Layout/Layout';

import './DashboardHome.scss';

const DashboardHome = () => (
  <Layout>
    <Hero
      programTitle="Master's Degree in Analytics"
      organizationLogo={{
        url: 'https://www.edx.org/sites/default/files/school/image/logo/gtx-logo-200x101.png',
        alt: 'Georgia Tech Institute of Technology logo',
      }}
      textureImage="https://prod-discovery.edx-cdn.org/media/degree_marketing/campus_images/gt-cyber-title_bg_img_440x400.jpg"
      coverImage="https://prod-discovery.edx-cdn.org/media/degree_marketing/campus_images/gt_cyber_campus_image_1000x400.jpg"
    />
    <div className="container py-5">
      <div className="row">
        <div className="col-xs-12 col-lg-7">
          <MainContent />
        </div>
        <MediaQuery minWidth={breakpoints.large.minWidth}>
          {matches => matches && (
            <div className="col offset-lg-1">
              <Sidebar />
            </div>
          )}
        </MediaQuery>
      </div>
    </div>
  </Layout>
);

export default withAuthentication(DashboardHome);
