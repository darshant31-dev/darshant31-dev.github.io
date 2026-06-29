document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Navbar Scroll Effect & Active Link Highlighting
    // ----------------------------------------------------
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, header');

    window.addEventListener('scroll', () => {
        // Sticky shadow transition
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.3)';
            navbar.style.background = 'rgba(3, 7, 18, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(3, 7, 18, 0.8)';
        }

        // Active link highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth Scroll for Navbar Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navLinksContainer = document.getElementById('navLinks');
                if (navLinksContainer) {
                    navLinksContainer.classList.remove('show');
                }
                
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ----------------------------------------------------
    // Mobile Nav Toggle
    // ----------------------------------------------------
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            const navLinksList = navMenu.querySelector('.nav-links');
            navLinksList.classList.toggle('show');
            const icon = mobileNavToggle.querySelector('i');
            if (navLinksList.classList.contains('show')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // ----------------------------------------------------
    // Skills Tab Filtering
    // ----------------------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const skillCards = document.querySelectorAll('.skill-category-card');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tabCategory = btn.getAttribute('data-tab');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (tabCategory === 'all' || cardCategory === tabCategory) {
                    card.style.display = 'flex';
                    // Trigger reflow for fade-in animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------
    // AI Chatbot Simulator Logic
    // ----------------------------------------------------
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const suggestButtons = document.querySelectorAll('.suggest-btn');

    // Predefined AI agent responses based on the PDF Resume
    const aiKnowledgeBase = [
        {
            keys: ['priorise', 'current', 'slack', 'agentforce', 'nba', 'sellers'],
            response: `At <strong>Priorise</strong> (Oct 2025 - Present), Darshan serves as a Senior Data Engineer. His key achievements include:
            <ul>
                <li>Developing a <strong>Salesforce Agentforce-based agent</strong> to automate Slack message delivery using segment filters and NLP.</li>
                <li>Building an AI-powered <strong>Next Best Actions (NBA)</strong> recommendation engine for sellers using LLMs and business intelligence datasets.</li>
                <li>Creating a scalable SQL-based <strong>Cohort Management platform</strong> to automate role assignment for onboarded sellers.</li>
            </ul>`
        },
        {
            keys: ['pixeldust', 'telecom', 'beam', 'dataflow', 'bigquery', 'network'],
            response: `At <strong>Pixeldust Technologies</strong> (Aug 2024 - Sep 2025), Darshan was a Senior Data Engineer:
            <ul>
                <li>Designed a real-time data pipeline for the Telecom Domain processing <strong>100–150 million streaming events daily</strong> using GCP Pub/Sub and Apache Beam on Dataflow.</li>
                <li>Persisted aggregated performance counters in <strong>BigQuery</strong>, building a golden layer to power real-time network KPI Grafana dashboards.</li>
                <li>Implemented anomaly detection with automated SMTP alerts and Kafka message routing.</li>
                <li>Enforced strict data quality checks, validation pipelines, and alerting mechanisms.</li>
            </ul>`
        },
        {
            keys: ['zs associates', 'zs', 'clinical', 'datazone', 'datamesh', 'forecasting', 'langchain', 'openai'],
            response: `At <strong>ZS Associates</strong> (Nov 2021 - Jul 2024), Darshan was a Senior Data Engineer:
            <ul>
                <li><strong>Gen-AI Trial Platform</strong>: Built a pre-clinical trial Gen-AI platform (Q&A chatbot, Azure OpenAI, document chunking & vector DB embeddings).</li>
                <li><strong>Data Mesh Architecture</strong>: Spearheaded a Data Mesh project on AWS using DataZone, Apache Iceberg, Glue, DMS, Step Functions, Athena, and PySpark.</li>
                <li><strong>Revenue Forecasting</strong>: Led a technical design for a web-app tool, cutting operational costs by <strong>33%</strong>.</li>
                <li><strong>LangChain POC</strong>: Deployed LangChain SQLDatabase-Toolkit stream applications to translate natural language prompts into SQL/Python.</li>
                <li><strong>Cloud Architecture</strong>: Created secure, serverless cloud solutions using API Gateway, Lambda, S3, CloudFront, and Route 53.</li>
            </ul>`
        },
        {
            keys: ['lumiq', 'kinesis', 'dynamodb', 'cloudwatch', 'datalake', 'glue'],
            response: `At <strong>Lumiq.Ai</strong> (Nov 2020 - Nov 2021), Darshan worked as a Data Engineer:
            <ul>
                <li>Developed PySpark frameworks for incremental data migration from S3 to AWS Kinesis streams, triggering AWS Lambda transforms.</li>
                <li>Designed CloudWatch dashboards to monitor Lambda execution anomalies, API thresholds, and DMS metrics.</li>
                <li>Established an enterprise data lake by migrating relational servers (Oracle, MySQL, SQL Server) to AWS S3 using AWS DMS.</li>
            </ul>`
        },
        {
            keys: ['datametica', 'birds', 'teradata', 'datastage', 'composer', 'dag'],
            response: `At <strong>Datametica Birds</strong> (Jul 2019 - Nov 2020), Darshan started as a Bigdata Engineer:
            <ul>
                <li>Migrated Datastage and Teradata ETL pipelines into Google BigQuery.</li>
                <li>Built ETL pipelines scheduled via Google Cloud Composer (Apache Airflow) and IBM Control-M.</li>
                <li>Developed a modular Python framework to recursively trigger dependent DAGs.</li>
            </ul>`
        },
        {
            keys: ['spark', 'pyspark', 'beam', 'dataflow', 'airflow', 'composer', 'kafka', 'pubsub'],
            response: `Darshan has heavy expertise in **Big Data and Distributed Processing**:
            <ul>
                <li><strong>Apache Spark & PySpark</strong>: Used heavily for large scale ETL processing, cohort management, and data transformations.</li>
                <li><strong>Apache Beam & Dataflow</strong>: Used at Pixeldust to aggregate 100-150M events per day in 5-minute fixed windows.</li>
                <li><strong>Apache Airflow / Cloud Composer</strong>: Engineered custom orchestrations, recursive DAG triggers, and pipeline task monitors.</li>
                <li><strong>Kafka & Pub/Sub</strong>: Implemented streaming event brokers and notification buses.</li>
            </ul>`
        },
        {
            keys: ['python', 'programming', 'scala', 'sql', 'bash'],
            response: `Darshan has 7+ years of programming experience across:
            <ul>
                <li><strong>Python</strong>: Core language for data engineering pipelines, GenAI models (LangChain, OpenAI), APIs, and automation.</li>
                <li><strong>SQL</strong>: Expert level SQL writing for BigQuery, Snowflake, Redshift, and AlloyDB pipelines.</li>
                <li><strong>PySpark & Scala</strong>: Utilized for distributed data transformations and memory management.</li>
                <li><strong>Bash</strong>: Used for environment automation and utility scripts.</li>
            </ul>`
        },
        {
            keys: ['aws', 'amazon', 'glue', 'emr', 'lambda', 'redshift', 'dynamodb', 'datazone'],
            response: `Darshan is a certified **AWS Cloud Developer Associate & Practitioner**. His AWS expertise includes:
            <ul>
                <li>AWS Glue & EMR for distributed Spark pipelines.</li>
                <li>API Gateway & Lambda for serverless, event-driven integrations.</li>
                <li>Redshift & DynamoDB for data warehousing and scalable NoSQL storage.</li>
                <li>AWS DataZone & Athena for implementing federated Data Mesh networks.</li>
            </ul>`
        },
        {
            keys: ['gcp', 'google', 'bigquery', 'dataflow', 'composer', 'dataproc', 'pubsub', 'vertex'],
            response: `Darshan is a certified **GCP Professional Data Engineer & GCP Professional Database Engineer**. His GCP stack includes:
            <ul>
                <li>BigQuery for real-time analytics warehousing and modeling.</li>
                <li>Dataflow & Pub/Sub for high-throughput streaming (150M+ events/day).</li>
                <li>Cloud Composer (Airflow) & Dataproc (Spark/Hadoop) for pipeline workflow.</li>
                <li>Vertex AI for cloud-based machine learning.</li>
            </ul>`
        },
        {
            keys: ['genai', 'llm', 'ai', 'agent', 'rag', 'langchain', 'openai', 'agentforce'],
            response: `Darshan specializes in cutting-edge **Generative AI and Intelligent Agents**:
            <ul>
                <li><strong>Priorise</strong>: Developed AI agents to recommend Next Best Actions (NBA) utilizing LLMs, and implemented Salesforce Agentforce automation.</li>
                <li><strong>ZS Associates</strong>: Created clinical chatbot systems using Azure OpenAI and vector DB embeddings with RAG architectures. Developed LangChain SQL translation pipelines.</li>
                <li><strong>Frameworks</strong>: OpenAI API, LangChain, Vertex AI, vector indexing, chunking, and prompt optimization.</li>
            </ul>`
        },
        {
            keys: ['certifications', 'certification', 'certified'],
            response: `Darshan holds 4 industry-recognized credentials:
            <ul>
                <li><strong>GCP Professional Data Engineer</strong> (Google Cloud)</li>
                <li><strong>GCP Professional Database Engineer</strong> (Google Cloud)</li>
                <li><strong>AWS Certified Developer - Associate</strong> (Amazon Web Services)</li>
                <li><strong>AWS Certified Cloud Practitioner</strong> (Amazon Web Services)</li>
            </ul>`
        },
        {
            keys: ['education', 'college', 'degree', 'pict', 'pune', 'sppu'],
            response: `Darshan earned a <strong>Bachelor of Engineering in Information Technology</strong> from <strong>Pune Institute of Computer Technology, Pune University (SPPU)</strong> in India:
            <ul>
                <li>Graduated with <strong>First Class with Distinction</strong>.</li>
                <li>Scored a cumulative grade of <strong>7.9 CGPA</strong>.</li>
            </ul>`
        },
        {
            keys: ['contact', 'email', 'phone', 'linkedin', 'github', 'details'],
            response: `You can reach out to Darshan directly:
            <ul>
                <li><strong>Email</strong>: <a href="mailto:dtawari31@gmail.com">dtawari31@gmail.com</a></li>
                <li><strong>Phone</strong>: <a href="tel:+917721905034">+91 77219 05034</a></li>
                <li><strong>LinkedIn</strong>: <a href="https://www.linkedin.com/in/dtawari31/" target="_blank">linkedin.com/in/dtawari31/</a></li>
                <li><strong>GitHub</strong>: <a href="https://github.com/darshant31-dev" target="_blank">github.com/darshant31-dev</a></li>
            </ul>`
        },
        {
            keys: ['experience', 'work', 'resume', 'pdf'],
            response: `Darshan Tawari is a Senior AI Data Engineer with <strong>7+ years of experience</strong> building distributed platforms, stream pipelines, and LLM applications. You can download his complete resume <a href="Darshan_Senior_Data_Engineer_Resume.pdf" download>here (PDF)</a> or ask me details about specific companies like <strong>Priorise</strong>, <strong>Pixeldust</strong>, or <strong>ZS Associates</strong>!`
        }
    ];

    const fallbackResponse = `I could not find a direct answer to that question in my database. Try asking about:
    <ul>
        <li>Darshan's recent work at <strong>Priorise</strong> or <strong>Pixeldust</strong>.</li>
        <li>His <strong>GenAI & LLM Projects</strong> (LangChain, Agents, OpenAI).</li>
        <li>His big data skills (<strong>Spark, Beam, Airflow, Kafka</strong>).</li>
        <li>His <strong>AWS & GCP certifications</strong>.</li>
        <li>How to <strong>contact</strong> him or download his <strong>resume</strong>.</li>
    </ul>`;

    // Process user input and generate agent response
    function handleUserQuestion(questionText) {
        if (!questionText.trim()) return;

        // Display user message in chat
        appendMessage(questionText, 'user-message');
        chatInput.value = '';

        // Display typing indicator
        const typingIndicator = appendTypingIndicator();
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate thinking delay
        setTimeout(() => {
            // Remove typing indicator
            typingIndicator.remove();

            // Find matching response in knowledge base
            const query = questionText.toLowerCase();
            let matchedObj = null;

            // Search for direct key matches
            for (const item of aiKnowledgeBase) {
                const matchFound = item.keys.some(key => query.includes(key));
                if (matchFound) {
                    matchedObj = item;
                    break;
                }
            }

            const replyText = matchedObj ? matchedObj.response : fallbackResponse;
            appendMessage(replyText, 'agent-message');
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1200);
    }

    function appendMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        
        // Use innerHTML since some responses contain lists/bolding/links
        messageDiv.innerHTML = text.replace(/\n/g, '<br>');
        chatMessages.appendChild(messageDiv);
        return messageDiv;
    }

    function appendTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator-bubble';
        typingDiv.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        chatMessages.appendChild(typingDiv);
        return typingDiv;
    }

    // Attach form submit event
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleUserQuestion(chatInput.value);
        });
    }

    // Attach suggestions buttons clicks
    suggestButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            handleUserQuestion(question);
        });
    });
});
