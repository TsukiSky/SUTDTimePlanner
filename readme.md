# SUTD Time Planner

![SUTD Time Planner](./SUTDTimePlannerFrontend/src/assets/logo.png)

**SUTD Time Planner** is a web tool designed to help SUTD students search for courses and schedule courses efficiently.

## Features

* **Course Search:** Students can search for available courses based on various criteria, such as course name, term, and pillar.
* **Timetable and Scheduling Visualization:** Students are able to visualize their course schedules on the website. Timetable wallpapers with different resolutions are available for download.
* **Course Conflict Detection:** The website automatically detects and highlights time conflicts that may arise when selecting courses.
* **Course Comment:** Students have the option to leave feedback on courses. We also offer an anonymous posting feature for privacy.

## Technologies Used

* **Frontend:** Developed using Angular and the NG-ZORRO UI library.
* **Backend:** Built in Java, with APIs for updating the course database.
* **Data Retrieval:** The courses' information is retrieved from the SUTD official website using Python Scraper.

## Getting Started

The website is available at  [SUTDTimePlanner](https://sutdtimeplanner.com). Moreover, you can launch a demo at your localhost by:

1. Clone the repository: `git clone git@github.com:TsukiSky/SUTDTimePlanner.git`
2. Navigate to the frontend directory: `SUTDTimePlanner/SUTDTimePlannerFrontend`
3. Install dependencies: `npm install`
4. Launch the server: `npm start`
5. To set up a demo backend, navigate to `SUTDTimePlanner/SUTDTimePlannerBackend` and compile with Java 17. Ensure you have a local database connection. A sample dataset can be found [here](/SUTDTimePlannerBackend/sample_data.json) in JSON format. You can manually add courses to you demo by using [Postman](https://www.postman.com) APIs.  Note that we have removed `application.properties` from this repository for security reasons.
6. Access your demo at: `http://localhost:4200/`.

## Contribution Guidelines

We welcome contributions! To contribute:

1. Clone this repository and implement your changes.
2. Test your changes and provide appropriate documentation.
3. Submit a pull request with a clear description of your changes together with their purpose.

We are still in beta, so please don't hesitate to contact us if you find a bug! We have identified some [improvement suggestions](https://github.com/TsukiSky/SUTDTimePlanner/tree/main/doc/improvement) for your reference.

## Credits

This project was born in February 2023. The maintainers of this project include:

| Student     | GitHub Account                                    | Enrollment Date | State  |
| ----------- | ------------------------------------------------- | --------------- | ------ |
| Xiang Siqi  | [TsukiSky](https://github.com/TsukiSky)           | Feb 2023        | Active |
| Wang Yanbao | [wangyanbao666](https://github.com/wangyanbao666) | Feb 2023        | Active |
| Wang Zuoran | [wzrwzr23](https://github.com/wzrwzr23)           | Feb 2023        | Active |

## License

This project is under the MIT License.
