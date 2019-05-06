/*
 * The `DashboardHome` component will likely handle the fetching of
 * the program course enrollments data for the logged in learner. This
 * endpoint is still in development. For the time being, we are including
 * a sample API response here.
 *
 * TODO: Get this response from the API endpoint!
 */
const sampleApiResponse = {
  course_runs: [
    {
      course_run_id: 'edX+DemoX+Demo_Course',
      display_name: 'edX Demonstration Course',
      resume_course_run_url: 'https://edx.org/',
      course_run_url: 'https://edx.org/',
      start_date: '2017-02-05T05:00:00Z',
      end_date: '2019-06-10T05:00:00Z',
      emails_enabled: true,
      upcoming_dates: [],
      micromasters_title: null,
      certificate_generation_url: null,
      status: 'in-progress',
    },
    {
      course_run_id: 'edX+DemoX+Demo_Course',
      display_name: 'edX Demonstration Course',
      resume_course_run_url: 'https://edx.org/',
      course_run_url: 'https://edx.org/',
      start_date: '2017-02-05T05:00:00Z',
      end_date: '2018-02-05T05:00:00Z',
      emails_enabled: true,
      upcoming_dates: [],
      micromasters_title: 'MicroMasters® Program in Analytics: Essential Tools and Methods',
      certificate_generation_url: null,
      status: 'completed',
    },
    {
      course_run_id: 'edX+DemoX+Demo_Course',
      display_name: 'edX Demonstration Course',
      resume_course_run_url: 'https://edx.org/',
      course_run_url: 'https://edx.org/',
      start_date: '2019-07-01T05:00:00Z',
      end_date: '2019-12-31T05:00:00Z',
      emails_enabled: true,
      upcoming_dates: [],
      micromasters_title: null,
      certificate_generation_url: null,
      status: 'upcoming',
    },
  ],
};

export default sampleApiResponse;
