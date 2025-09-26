export const questions = [
    {
        'question': 'Which of the following is NOT a primary goal of test automation?',
        'answers': [
            {
                'text': 'To increase test coverage',
                'correct': false
            },
            {
                'text': 'To reduce the time it takes to run tests',
                'correct': false
            },
            {
                'text': 'To eliminate the need for manual testing entirely',
                'correct': true
            },
            {
                'text': 'To improve the accuracy and reliability of tests',
                'correct': false
            }
        ]
    },
    {
        'question': 'What is the purpose of a test automation framework?',
        'answers': [
            {
                'text': 'To provide a set of rules and guidelines for creating and organizing automated tests.',
                'correct': true
            },
            {
                'text': 'To automatically generate test cases.',
                'correct': false
            },
            {
                'text': 'To execute test cases on multiple machines simultaneously.',
                'correct': false
            },
            {
                'text': 'To provide a graphical user interface for writing tests.',
                'correct': false
            }
        ]
    },
    {
        'question': 'What is contract testing in the context of APIs?',
        'answers': [
            {
                'text': 'Testing the performance of an API under a heavy load.',
                'correct': false
            },
            {
                'text': 'Testing the security of an API against common vulnerabilities.',
                'correct': false
            },
            {
                'text': 'Verifying that an API conforms to a predefined specification.',
                'correct': true
            },
            {
                'text': 'Testing the usability of an API for developers.',
                'correct': false
            }
        ]
    },
    {
        'question': 'Which of the following locators is generally considered the most reliable and fastest for identifying web elements in UI automation?',
        'answers': [
            {
                'text': 'XPath',
                'correct': false
            },
            {
                'text': 'CSS Selector',
                'correct': false
            },
            {
                'text': 'ID',
                'correct': true
            },
            {
                'text': 'Class Name',
                'correct': false
            }
        ]
    },
    {
        'question': 'What is \'flaky testing\' in test automation?',
        'answers': [
            {
                'text': 'Tests that always fail.',
                'correct': false
            },
            {
                'text': 'Tests that pass and fail intermittently.',
                'correct': true
            },
            {
                'text': 'Tests that run very slowly.',
                'correct': false
            },
            {
                'text': 'It supports a wider range of web technologies.',
                'correct': false
            }
        ]
    },
    {
        'question': 'Which of these is a common tool used for API testing?',
        'answers': [
            {
                'text': 'Playwright',
                'correct': false
            },
            {
                'text': 'Rest Assured',
                'correct': true
            },
            {
                'text': 'Jira',
                'correct': false
            },
            {
                'text': 'Devtools',
                'correct': false
            }
        ]
    },
    {
        'question': 'Which of the following is a test runner?',
        'answers': [
            {
                'text': 'Playwright',
                'correct': false
            },
            {
                'text': 'Karma',
                'correct': true
            },
            {
                'text': 'Junit',
                'correct': false
            },
            {
                'text': 'TestNG',
                'correct': false
            }
        ]
    },
    {
        'question': 'What is the primary benefit of using a \'headless browser\' for UI automation?',
        'answers': [
            {
                'text': 'It allows you to test the visual appearance of the website more accurately.',
                'correct': false
            },
            {
                'text': 'It runs tests faster and consumes fewer resources.',
                'correct': true
            },
            {
                'text': 'It makes debugging test scripts easier.',
                'correct': false
            },
            {
                'text': 'It supports a wider range of web technologies.',
                'correct': false
            }
        ]
    },
    {
        'question': 'What is the Selenium Grid Hub\'s main role?',
        'answers': [
            {
                'text': 'It stores browser drivers.',
                'correct': false
            },
            {
                'text': 'It runs the tests.',
                'correct': false
            },
            {
                'text': 'It creates test reports.',
                'correct': false
            },
            {
                'text': 'It routes tests to browsers.',
                'correct': true
            }
        ]
    },
    {
        'question': 'Why choose XPath over a CSS selector?',
        'answers': [
            {
                'text': 'For better performance.',
                'correct': false
            },
            {
                'text': 'To find elements by text.',
                'correct': true
            },
            {
                'text': 'To select elements with an ID.',
                'correct': false
            },
            {
                'text': 'For simpler page structures.',
                'correct': false
            }
        ]
    },
    {
        'question': 'Why is it generally a bad practice to use fixed time delays (like sleep(5)) in automation scripts?',
        'answers': [
            {
                'text': 'It can make tests more stable.',
                'correct': false
            },
            {
                'text': 'It can make tests unreliable and slow.',
                'correct': true
            },
            {
                'text': 'It is not supported in automation frameworks.',
                'correct': false
            },
            {
                'text': 'It consumes a large amount of resources.',
                'correct': false
            }
        ]
    },
    {
        'question': 'What is the main purpose of a \'test runner\'?',
        'answers': [
            {
                'text': 'To find and execute tests, and report the results.',
                'correct': true
            },
            {
                'text': 'To write the test scripts.',
                'correct': false
            },
            {
                'text': 'To manage the versions of the project\'s dependencies.',
                'correct': false
            },
            {
                'text': 'To control the browser and interact with web elements.',
                'correct': false
            }
        ]
    },
    {
        'question': 'What causes a \'StaleElementReferenceException\'?',
        'answers': [
            {
                'text': 'The element was found, but it is not visible to the user.',
                'correct': false
            },
            {
                'text': 'A reference to an element is no longer valid.',
                'correct': true
            },
            {
                'text': 'The locator used to find the element is syntactically incorrect.',
                'correct': false
            },
            {
                'text': 'The element could not be found on the page at all.',
                'correct': false
            }
        ]
    },
    {
        'question': 'Manual When is smoke testing usually performed?',
        'answers': [
            {
                'text': 'Right after a new build to ensure basic stability',
                'correct': true
            },
            {
                'text': 'After unit testing is complete',
                'correct': false
            },
            {
                'text': 'Only after release to production',
                'correct': false
            },
            {
                'text': 'During security audits',
                'correct': false
            }
        ]
    },
    {
        'question': 'Which of the following best describes boundary value analysis?',
        'answers': [
            {
                'text': 'Testing user interface colors',
                'correct': false
            },
            {
                'text': 'Verifying only non-functional aspects',
                'correct': false
            },
            {
                'text': 'Testing only middle values',
                'correct': false
            },
            {
                'text': 'Testing at the edge values of input ranges',
                'correct': true
            }
        ]
    },
    {
        'question': 'Why is a traceability matrix important?',
        'answers': [
            {
                'text': 'To monitor developer work hours',
                'correct': false
            },
            {
                'text': 'To ensure every requirement is covered by test cases',
                'correct': true
            },
            {
                'text': 'To manage automation scripts',
                'correct': false
            },
            {
                'text': 'To track network performance',
                'correct': false
            }
        ]
    },
    {
        'question': 'A defect is found after release. Which testing phase most likely missed it?',
        'answers': [
            {
                'text': 'Smoke testing',
                'correct': false
            },
            {
                'text': 'Unit testing only',
                'correct': false
            },
            {
                'text': 'All earlier phases could have missed it ',
                'correct': true
            },
            {
                'text': 'End to End testing',
                'correct': false
            }
        ]
    },
    {
        'question': 'What is the primary challenge of testing without clear requirements?',
        'answers': [
            {
                'text': 'Difficulty defining expected results and coverage',
                'correct': true
            },
            {
                'text': 'Increased hardware costs',
                'correct': false
            },
            {
                'text': 'Lack of automation tools',
                'correct': false
            },
            {
                'text': 'Slow network speed',
                'correct': false
            }
        ]
    },
    {
        'question': 'What is the primary goal of functional testing?',
        'answers': [
            {
                'text': 'To measure how fast the system responds under heavy load',
                'correct': false
            },
            {
                'text': 'To verify that the application behaves according to specified requirements',
                'correct': true
            },
            {
                'text': 'To check the look and feel across different screen sizes',
                'correct': false
            },
            {
                'text': 'To confirm that security controls prevent intrusion',
                'correct': false
            }
        ]
    },
    {
        'question': 'Which HTTP status code indicates a successful creation of a resource?',
        'answers': [
            {
                'text': '200',
                'correct': false
            },
            {
                'text': '418',
                'correct': false
            },
            {
                'text': '204',
                'correct': false
            },
            {
                'text': '201',
                'correct': true
            }
        ]
    },
    {
        'question': 'A release goes live and users report inconsistent results when multiple modules interact. Which earlier testing phase likely needed stronger coverage?',
        'answers': [
            {
                'text': 'Smoke testing',
                'correct': false
            },
            {
                'text': ' Integration testing',
                'correct': true
            },
            {
                'text': 'Regression testing',
                'correct': false
            },
            {
                'text': 'xploratory testing',
                'correct': false
            }
        ]
    },
    {
        'question': 'A developer can\'t reproduce your bug. What\'s your first step?',
        'answers': [
            {
                'text': 'Close the bug ticket. ',
                'correct': false
            },
            {
                'text': 'Assume it was a one-time glitch and move on. ',
                'correct': true
            },
            {
                'text': 'Guide the developer through the steps on a shared screen. ',
                'correct': false
            },
            {
                'text': 'Resubmit the exact same bug report.',
                'correct': false
            }
        ]
    },
    {
        'question': 'Which statement accurately describes both black-box and white-box testing?',
        'answers': [
            {
                'text': 'White-box tests functionality; black-box tests code. ',
                'correct': false
            },
            {
                'text': 'Black-box is done by developers; white-box by users. ',
                'correct': false
            },
            {
                'text': 'Black-box is always manual; white-box is always automated. ',
                'correct': false
            },
            {
                'text': 'Black-box tests functionality without seeing code; white-box tests the code itself.',
                'correct': true
            }
        ]
    }
];