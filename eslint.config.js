<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Davis Rapp | Data Analyst</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-primary: #0f1117;
            --bg-secondary: #161921;
            --bg-card: #1c1f2a;
            --bg-card-hover: #242836;
            --text-primary: #ffffff;
            --text-secondary: #8b8fa3;
            --text-muted: #5a5f73;
            --border-color: rgba(255, 255, 255, 0.08);
            --accent-blue: #3b82f6;
            --accent-purple: #8b5cf6;
            --accent-pink: #ec4899;
            --accent-green: #22c55e;
            --accent-orange: #f97316;
            --accent-cyan: #06b6d4;
            --accent-red: #ef4444;
            --accent-yellow: #eab308;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            overflow-x: hidden;
        }
        nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(15, 17, 23, 0.9);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-color);
        }
        .logo { display: flex; align-items: center; gap: 0.75rem; }
        .logo-icon {
            width: 42px;
            height: 42px;
            background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1rem;
        }
        .logo-text { display: flex; flex-direction: column; }
        .logo-name { font-weight: 700; font-size: 1.1rem; }
        .logo-name span { color: var(--accent-blue); }
        .logo-title { font-size: 0.75rem; color: var(--text-secondary); }
        .nav-links { display: flex; gap: 0.5rem; list-style: none; }
        .nav-links a {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            padding: 0.6rem 1rem;
            border-radius: 10px;
            transition: all 0.2s ease;
        }
        .nav-links a:hover, .nav-links a.active { background: var(--bg-card); color: var(--text-primary); }
        .nav-links a.active { background: var(--accent-blue); }
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding: 8rem 4rem 4rem;
            max-width: 1400px;
            margin: 0 auto;
            gap: 4rem;
        }
        .hero-left { flex: 1; }
        .hero-right { flex: 0 0 380px; }
        .typing-label {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: var(--bg-card);
            border-radius: 8px;
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
            border: 1px solid var(--border-color);
        }
        .typing-label .typed { color: var(--accent-blue); }
        .typing-label .cursor {
            display: inline-block;
            width: 2px;
            height: 1em;
            background: var(--accent-blue);
            margin-left: 2px;
            animation: blink 1s infinite;
            vertical-align: text-bottom;
        }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        .hero h1 { font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
        .hero h1 .gradient {
            background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .hero-description { font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7; }
        .hero-buttons { display: flex; gap: 1rem; margin-bottom: 2rem; }
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.9rem 1.5rem;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            cursor: pointer;
            border: none;
        }
        .btn-primary { background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple)); color: white; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.35); }
        .btn-secondary { background: var(--bg-card); color: var(--text-primary); border: 1px solid var(--border-color); }
        .btn-secondary:hover { background: var(--bg-card-hover); border-color: var(--accent-blue); }
        .social-links { display: flex; gap: 0.75rem; }
        .social-link {
            width: 44px;
            height: 44px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
            transition: all 0.2s ease;
        }
        .social-link:hover { background: var(--bg-card-hover); color: var(--text-primary); border-color: var(--accent-blue); }
        .profile-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 24px;
            padding: 2rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .profile-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100px;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
        }
        .profile-image {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            border: 4px solid var(--bg-card);
            margin: 0 auto 1rem;
            position: relative;
            z-index: 1;
            object-fit: cover;
            background: var(--bg-secondary);
        }
        .profile-name { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
        .profile-title { color: var(--accent-cyan); font-size: 0.95rem; font-weight: 500; margin-bottom: 1.5rem; }
        .profile-skills { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .profile-skill {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1rem;
            text-align: left;
        }
        .profile-skill-name { font-size: 0.85rem; font-weight: 600; color: var(--accent-blue); margin-bottom: 0.25rem; }
        .profile-skill-desc { font-size: 0.75rem; color: var(--text-secondary); }
        section { padding: 5rem 4rem; max-width: 1400px; margin: 0 auto; }
        .section-full { max-width: none; background: var(--bg-secondary); }
        .section-inner { max-width: 1400px; margin: 0 auto; }
        .section-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 100px;
            font-size: 0.85rem;
            color: var(--accent-blue);
            margin-bottom: 1rem;
        }
        .section-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.75rem; }
        .section-subtitle { color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 3rem; }
        .section-header { text-align: center; margin-bottom: 3rem; }
        .experience-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .exp-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 2rem;
            transition: all 0.3s ease;
        }
        .exp-card:hover { border-color: var(--accent-green); }
        .exp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
        .exp-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
        .exp-badge {
            padding: 0.3rem 0.75rem;
            background: rgba(34, 197, 94, 0.15);
            color: var(--accent-green);
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .exp-company { color: var(--accent-green); font-size: 0.9rem; font-weight: 500; margin-bottom: 0.25rem; }
        .exp-date { color: var(--text-muted); font-size: 0.85rem; }
        .exp-description { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.7; }
        .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .project-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 1.75rem;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
        }
        .project-card:hover { transform: translateY(-6px); border-color: var(--accent-blue); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); }
        .project-card.featured { grid-column: 1 / -1; }
        .project-category {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.4rem 0.9rem;
            border-radius: 100px;
            font-size: 0.75rem;
            font-weight: 600;
            width: fit-content;
            margin-bottom: 1rem;
        }
        .project-category.analytics { background: rgba(239, 68, 68, 0.15); color: var(--accent-red); }
        .project-category.automation { background: rgba(234, 179, 8, 0.15); color: var(--accent-yellow); }
        .project-category.ml { background: rgba(139, 92, 246, 0.15); color: var(--accent-purple); }
        .project-category.healthcare { background: rgba(6, 182, 212, 0.15); color: var(--accent-cyan); }
        .project-category.engineering { background: rgba(249, 115, 22, 0.15); color: var(--accent-orange); }
        .project-category.ops { background: rgba(34, 197, 94, 0.15); color: var(--accent-green); }
        .project-card h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.3; }
        .project-details { flex-grow: 1; margin-bottom: 1.25rem; }
        .project-detail { display: flex; gap: 0.5rem; margin-bottom: 0.6rem; font-size: 0.9rem; color: var(--text-secondary); }
        .project-detail-label { color: var(--text-muted); font-weight: 500; min-width: 65px; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .project-tag {
            padding: 0.35rem 0.75rem;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-size: 0.75rem;
            color: var(--text-secondary);
        }
        .project-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--border-color); }
        .project-link {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.6rem 1.2rem;
            background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.2s ease;
        }
        .project-link:hover { transform: translateX(4px); }
        .project-link-secondary { color: var(--text-secondary); text-decoration: none; font-size: 0.85rem; transition: color 0.2s ease; }
        .project-link-secondary:hover { color: var(--accent-blue); }
        .skills-container { max-width: 900px; margin: 0 auto; }
        .skills-group { margin-bottom: 2rem; }
        .skills-group-title { font-size: 0.85rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem; }
        .skills-tags { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .skill-tag {
            padding: 0.7rem 1.3rem;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            font-size: 0.9rem;
            color: var(--text-primary);
            transition: all 0.2s ease;
        }
        .skill-tag:hover { border-color: var(--accent-blue); background: var(--bg-card-hover); }
        .side-projects-content { max-width: 800px; margin: 0 auto; }
        .side-projects-text { color: var(--text-secondary); font-size: 1.05rem; line-height: 1.8; margin-bottom: 2rem; }
        .side-projects-list { display: flex; flex-direction: column; gap: 1rem; }
        .side-project-item {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1.25rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            transition: all 0.2s ease;
        }
        .side-project-item:hover { border-color: var(--accent-cyan); }
        .side-project-text { color: var(--text-primary); font-size: 0.95rem; }
        .side-project-status { margin-left: auto; padding: 0.3rem 0.75rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
        .side-project-status.done { background: rgba(34, 197, 94, 0.15); color: var(--accent-green); }
        .side-project-status.wip { background: rgba(234, 179, 8, 0.15); color: var(--accent-yellow); }
        .certs-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .cert-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 1.5rem;
            text-align: center;
            transition: all 0.3s ease;
        }
        .cert-card:hover { transform: translateY(-4px); border-color: var(--accent-purple); }
        .cert-icon { width: 60px; height: 60px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.75rem; }
        .cert-icon.blue { background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2)); }
        .cert-icon.purple { background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2)); }
        .cert-icon.orange { background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(234, 179, 8, 0.2)); }
        .cert-icon.green { background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(6, 182, 212, 0.2)); }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .about-content p { color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.7; font-size: 1.05rem; }
        .about-hobbies { display: flex; gap: 1rem; margin-top: 1.5rem; }
        .hobby-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1rem 1.25rem;
            text-align: center;
            flex: 1;
            transition: all 0.2s ease;
        }
        .hobby-card:hover { border-color: var(--accent-blue); }
        .hobby-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .hobby-name { font-size: 0.85rem; color: var(--text-secondary); }
        .about-image { display: flex; justify-content: center; }
        .about-image-wrapper { position: relative; }
        .about-image-wrapper img { width: 320px; height: 320px; object-fit: cover; border-radius: 24px; border: 2px solid var(--border-color); }
        .about-image-wrapper::before {
            content: '';
            position: absolute;
            top: -10px;
            right: -10px;
            bottom: 10px;
            left: 10px;
            border: 2px solid var(--accent-blue);
            border-radius: 24px;
            z-index: -1;
        }
        .contact-container { text-align: center; max-width: 600px; margin: 0 auto; }
        .contact-links { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        .contact-link {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            padding: 1rem 1.5rem;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            color: var(--text-primary);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        .contact-link:hover { border-color: var(--accent-blue); transform: translateY(-4px); }
        .contact-link svg { width: 20px; height: 20px; }
        footer { padding: 2rem; text-align: center; border-top: 1px solid var(--border-color); }
        footer p { font-size: 0.9rem; color: var(--text-muted); }
        .animate { opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .animate.visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 1200px) { .certs-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 992px) {
            .hero { flex-direction: column; text-align: center; padding: 7rem 2rem 3rem; }
            .hero-right { flex: none; width: 100%; max-width: 380px; }
            .hero-buttons, .social-links { justify-content: center; }
            .projects-grid, .experience-grid, .about-grid { grid-template-columns: 1fr; }
            .project-card.featured { grid-column: auto; }
            section { padding: 3rem 1.5rem; }
        }
        @media (max-width: 768px) {
            nav { padding: 1rem; }
            .nav-links { display: none; }
            .hero h1 { font-size: 2.5rem; }
            .certs-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <nav>
        <div class="logo">
            <div class="logo-icon">DR</div>
            <div class="logo-text">
                <span class="logo-name">Davis<span>Rapp</span></span>
                <span class="logo-title">Data Analyst</span>
            </div>
        </div>
        <ul class="nav-links">
            <li><a href="#home" class="active">Home</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#side-projects">Side Projects</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <section class="hero" id="home">
        <div class="hero-left">
            <div class="typing-label">
                I'm a <span class="typed">Data Analyst</span><span class="cursor"></span>
            </div>
            <h1>Making data<br><span class="gradient">useful.</span></h1>
            <p class="hero-description">
                Hi, I'm Davis Rapp. I build dashboards, automate reporting, and turn complex data into clear, actionable insights. I work across SQL, Python, Tableau, and Excel to help teams make better decisions with the data they already have.
            </p>
            <div class="hero-buttons">
                <a href="#projects" class="btn btn-primary">
                    View My Work
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="#contact" class="btn btn-secondary">
                    Get In Touch
                </a>
            </div>
            <div class="social-links">
                <a href="https://github.com/drapp3" target="_blank" class="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/davis-rapp-2b7167128/" target="_blank" class="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="mailto:drappanalysis@gmail.com" class="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </a>
            </div>
        </div>
        <div class="hero-right">
            <div class="profile-card">
                <img src="headshot.png" alt="Davis Rapp" class="profile-image">
                <h2 class="profile-name">Davis Rapp</h2>
                <p class="profile-title">Data Analyst</p>
                <div class="profile-skills">
                    <div class="profile-skill">
                        <div class="profile-skill-name">SQL</div>
                        <div class="profile-skill-desc">Queries and ETL</div>
                    </div>
                    <div class="profile-skill">
                        <div class="profile-skill-name">Tableau</div>
                        <div class="profile-skill-desc">Dashboards</div>
                    </div>
                    <div class="profile-skill">
                        <div class="profile-skill-name">Python</div>
                        <div class="profile-skill-desc">Automation and ML</div>
                    </div>
                    <div class="profile-skill">
                        <div class="profile-skill-name">Excel</div>
                        <div class="profile-skill-desc">Analysis and reporting</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section-full" id="experience">
        <div class="section-inner">
            <div class="section-header">
                <div class="section-badge">Experience</div>
                <h2 class="section-title">Work History</h2>
            </div>
            <div class="experience-grid">
                <div class="exp-card animate">
                    <div class="exp-header">
                        <div>
                            <h3 class="exp-title">Data Analytics Consultant</h3>
                            <div class="exp-company">DryWorx</div>
                            <div class="exp-date">Sept 2023 – Present</div>
                        </div>
                        <span class="exp-badge">Current</span>
                    </div>
                    <p class="exp-description">
                        Built a Python ETL pipeline integrating Jobber CRM data across 200+ monthly projects, implementing data validation and transformation logic that reduced manual reporting by 20+ hours per month. Developed Tableau and Excel dashboards used by leadership to track revenue, close rates, and crew efficiency. Performed exploratory and operational analysis on service profitability, job delays, and sales performance, directly informing pricing changes and surfacing workflow bottlenecks.
                    </p>
                </div>
                <div class="exp-card animate">
                    <div class="exp-header">
                        <div>
                            <h3 class="exp-title">Physical Therapist Assistant (PRN)</h3>
                            <div class="exp-company">Multiple Rehab Facilities</div>
                            <div class="exp-date">Feb 2021 – Present</div>
                        </div>
                        <span class="exp-badge">Current</span>
                    </div>
                    <p class="exp-description">
                        Analyzed patient outcome data (ROM, pain scores, mobility metrics) to identify treatment effectiveness trends and support clinical decision-making. Maintained and validated structured EHR data for 1,000+ patients across multiple facilities, ensuring data integrity, compliance, and consistency across systems.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section id="projects">
        <div class="section-header">
            <div class="section-badge">Featured Work</div>
            <h2 class="section-title">Projects</h2>
        </div>
        <div class="projects-grid">
            <div class="project-card featured animate">
                <span class="project-category ops">Operations Analytics</span>
                <h3>Supply Chain Operations Dashboard</h3>
                <div class="project-details">
                    <div class="project-detail">
                        <span class="project-detail-label">Problem:</span>
                        <span>Track supplier delivery performance, inventory health, and operational KPIs across a multi-warehouse supply chain</span>
                    </div>
                    <div class="project-detail">
                        <span class="project-detail-label">Data:</span>
                        <span>2,500 purchase orders across 10 suppliers, 5 warehouses, and 15 product SKUs</span>
                    </div>
                    <div class="project-detail">
                        <span class="project-detail-label">Outcome:</span>
                        <span>End-to-end pipeline (Python ETL → SQLite → React dashboard) surfacing 58% on-time rate, 8 critical inventory alerts, and supplier scorecards</span>
                    </div>
                </div>
                <div class="project-tags">
                    <span class="project-tag">Python</span>
                    <span class="project-tag">SQL</span>
                    <span class="project-tag">SQLite</span>
                    <span class="project-tag">React</span>
                    <span class="project-tag">Recharts</span>
                    <span class="project-tag">ETL</span>
                </div>
                <div class="project-footer">
                    <a href="https://drapp3.github.io/supply-chain-analytics/" class="project-link-secondary">Live Demo</a>
                    <a href="https://github.com/drapp3/supply-chain-analytics" class="project-link">View Project</a>
                </div>
            </div>
            <div class="project-card animate">
                <span class="project-category healthcare">Healthcare Analytics</span>
                <h3>Inpatient Readmission Risk Analysis</h3>
                <div class="project-details">
                    <div class="project-detail">
                        <span class="project-detail-label">Problem:</span>
                        <span>Identify drivers of 30-day hospital readmissions and segment patients by risk level</span>
                    </div>
                    <div class="project-detail">
                        <span class="project-detail-label">Data:</span>
                        <span>101,766 patient encounters from 130 US hospitals</span>
                    </div>
                    <div class="project-detail">
                        <span class="project-detail-label">Outcome:</span>
                        <span>Risk-tiered patients into Low/Med/High groups; high-risk showed 3x readmission rate (22.9%) vs low-risk (7.8%)</span>
                    </div>
                </div>
                <div class="project-tags">
                    <span class="project-tag">Python</span>
                    <span class="project-tag">SQL</span>
                    <span class="project-tag">scikit-learn</span>
                    <span class="project-tag">Tableau</span>
                </div>
                <div class="project-footer">
                    <a href="https://github.com/drapp3/hospital-readmission-analysis#readme" class="project-link-secondary">View README</a>
                    <a href="https://github.com/drapp3/hospital-readmission-analysis" class="project-link">View Project</a>
                </div>
            </div>
            <div class="project-card animate">
                <span class="project-category ml">Machine Learning</span>
                <h3>Auto Insurance Fraud Detection</h3>
                <div class="project-details">
                    <div class="project-detail">
                        <span class="project-detail-label">Problem:</span>
                        <span>Identify fraudulent auto insurance claims before payout</span>
                    </div>
                    <div class="project-detail">
                        <span class="project-detail-label">Data:</span>
                        <span>15,000+ claims with 30+ features</span>
                    </div>
                    <div class="project-detail">
                        <span class="project-detail-label">Outcome:</span>
                        <span>61% recall, 0.67 ROC-AUC; estimated $98K annual savings</span>
                    </div>
                </div>
                <div class="project-tags">
                    <span class="project-tag">Python</span>
                    <span class="project-tag">scikit-learn</span>
                    <span class="project-tag">SMOTE</span>
                    <span class="project-tag">pandas</span>
                </div>
                <div class="project-footer">
                    <a href="https://github.com/drapp3/auto-insurance-fraud-detection#readme" class="project-link-secondary">View README</a>
                    <a href="https://github.com/drapp3/auto-insurance-fraud-detection" class="project-link">View Project</a>
                </div>
            </div>
            <div class="project-card animate">
                <span class="project-category engineering">Data Engineering</span>
                <h3>Polymarket Wallet Tracker</h3>
                <div class="project-details">
                    <div class="project-detail">
                        <span class="project-detail-label">Problem:</span>
                        <span>Track top-performing prediction market traders in real time and surface where sharp money is moving</span>
                    </div>
                    <div class="project-detail">
                        <span class="project-detail-label">Stack:</span>
                        <span>Python FastAPI backend with five concurrent async polling loops, SQLite with WAL mode, vanilla JS frontend</span>
                    </div>
                    <div class="project-detail">
                        <span class="project-detail-label">Outcome:</span>
                        <span>Real-time alert system with trade diffing, resolution tracking, wallet sharpness scoring, and market convergence detection</span>
                    </div>
                </div>
                <div class="project-tags">
                    <span class="project-tag">Python</span>
                    <span class="project-tag">FastAPI</span>
                    <span class="project-tag">Async</span>
                    <span class="project-tag">SQLite</span>
                    <span class="project-tag">REST APIs</span>
                    <span class="project-tag">ETL</span>
                </div>
                <div class="project-footer">
                    <a href="https://github.com/drapp3/polymarket-wallet-tracker#readme" class="project-link-secondary">View README</a>
                    <a href="https://github.com/drapp3/polymarket-wallet-tracker" class="project-link">View Project</a>
                </div>
            </div>
            <div class="project-card animate">
                <span class="project-category analytics">Data Analytics</span>
                <h3>Job Market Analysis</h3>
                <div class="project-details">
                    <div class="project-detail">
                        <span class="project-detail-label">Problem:</span>
                        <span>Understand hiring trends and salary patterns in the data analyst job market</span>
                    </div>
                    <div class="project-detail">
                        <span class="project-detail-label">Data:</span>
                        <span>2,250+ job postings scraped and cleaned</span>
                    </div>
                    <div class="project-detail">
                        <span class="project-detail-label">Outcome:</span>
                        <span>K-means clustering revealed distinct market segments; interactive Tableau dashboard published</span>
                    </div>
                </div>
                <div class="project-tags">
                    <span class="project-tag">Python</span>
                    <span class="project-tag">pandas</span>
                    <span class="project-tag">scikit-learn</span>
                    <span class="project-tag">Tableau</span>
                </div>
                <div class="project-footer">
                    <a href="https://github.com/drapp3/data-analyst-job-market-analysis#readme" class="project-link-secondary">View README</a>
                    <a href="https://github.com/drapp3/data-analyst-job-market-analysis" class="project-link">View Project</a>
                </div>
            </div>
            <div class="project-card animate">
                <span class="project-category automation">Dashboard</span>
                <h3>Sales Performance Dashboard</h3>
                <div class="project-details">
                    <div class="project-detail">
                        <span class="project-detail-label">Problem:</span>
                        <span>Enable leadership to track sales KPIs across regions and products</span>
                    </div>
                    <div class="project-detail">
                        <span class="project-detail-label">Data:</span>
                        <span>Multi-source sales data cleaned via Power Query</span>
                    </div>
                    <div class="project-detail">
                        <span class="project-detail-label">Outcome:</span>
                        <span>Interactive Excel dashboard with slicers for region, product, and time filtering</span>
                    </div>
                </div>
                <div class="project-tags">
                    <span class="project-tag">Excel</span>
                    <span class="project-tag">Power Query</span>
                    <span class="project-tag">Pivot Tables</span>
                </div>
                <div class="project-footer">
                    <a href="https://github.com/drapp3/sales-performance-dashboard#readme" class="project-link-secondary">View README</a>
                    <a href="https://github.com/drapp3/sales-performance-dashboard" class="project-link">View Project</a>
                </div>
            </div>
        </div>
    </section>

    <section id="skills">
        <div class="section-header">
            <div class="section-badge">Technical Skills</div>
            <h2 class="section-title">My Toolkit</h2>
        </div>
        <div class="skills-container animate">
            <div class="skills-group">
                <div class="skills-group-title">Languages</div>
                <div class="skills-tags">
                    <span class="skill-tag">Python (pandas, NumPy, scikit-learn)</span>
                    <span class="skill-tag">SQL (PostgreSQL, MySQL, SQLite)</span>
                </div>
            </div>
            <div class="skills-group">
                <div class="skills-group-title">Visualization</div>
                <div class="skills-tags">
                    <span class="skill-tag">Tableau</span>
                    <span class="skill-tag">Power BI</span>
                    <span class="skill-tag">Excel</span>
                </div>
            </div>
            <div class="skills-group">
                <div class="skills-group-title">Data</div>
                <div class="skills-tags">
                    <span class="skill-tag">Data Cleaning</span>
                    <span class="skill-tag">Data Modeling</span>
                    <span class="skill-tag">Dashboards</span>
                    <span class="skill-tag">Statistical Analysis</span>
                </div>
            </div>
            <div class="skills-group">
                <div class="skills-group-title">Engineering</div>
                <div class="skills-tags">
                    <span class="skill-tag">ETL Pipelines</span>
                    <span class="skill-tag">API Integration</span>
                    <span class="skill-tag">Automation</span>
                    <span class="skill-tag">Git/GitHub</span>
                    <span class="skill-tag">AWS</span>
                </div>
            </div>
        </div>
    </section>

    <section class="section-full" id="side-projects">
        <div class="section-inner">
            <div class="section-header">
                <div class="section-badge">Side Projects</div>
                <h2 class="section-title">Quantitative Modeling</h2>
            </div>
            <div class="side-projects-content animate">
                <p class="side-projects-text">
                    I use sports and prediction market data as a sandbox for building quantitative models and testing decision-making under uncertainty. These projects are built in Python and focus on real-time data collection, statistical modeling, and simulation.
                </p>
                <div class="side-projects-list">
                    <div class="side-project-item">
                        <span class="side-project-text">Real-time data pipelines for collecting and structuring market pricing data</span>
                        <span class="side-project-status done">Complete</span>
                    </div>
                    <div class="side-project-item">
                        <span class="side-project-text">Statistical models for player performance projections</span>
                        <span class="side-project-status done">Complete</span>
                    </div>
                    <div class="side-project-item">
                        <span class="side-project-text">Web scraping and Monte Carlo simulation tools</span>
                        <span class="side-project-status wip">In Progress</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="certifications">
        <div class="section-header">
            <div class="section-badge">Credentials</div>
            <h2 class="section-title">Certifications and Education</h2>
        </div>
        <div class="certs-grid">
            <div class="cert-card animate">
                <div class="cert-icon blue">📊</div>
                <div class="cert-name">CompTIA Data+</div>
                <div class="cert-issuer">CompTIA</div>
            </div>
            <div class="cert-card animate">
                <div class="cert-icon purple">📋</div>
                <div class="cert-name">CompTIA Project+</div>
                <div class="cert-issuer">CompTIA</div>
            </div>
            <div class="cert-card animate">
                <div class="cert-icon orange">☁️</div>
                <div class="cert-name">AWS Cloud Practitioner</div>
                <div class="cert-issuer">Amazon Web Services</div>
            </div>
            <div class="cert-card animate">
                <div class="cert-icon green">🎓</div>
                <div class="cert-name">BS Data Analytics</div>
                <div class="cert-issuer">Western Governors University</div>
            </div>
        </div>
    </section>

    <section class="section-full" id="about">
        <div class="section-inner">
            <div class="section-header">
                <div class="section-badge">About</div>
                <h2 class="section-title">A Bit About Me</h2>
            </div>
            <div class="about-grid">
                <div class="about-content animate">
                    <p>I'm a data analyst based in North Carolina. I started my career as a physical therapist assistant, tracking patient outcomes, maintaining health records, and learning how good data supports better decisions. That clinical background gave me a different perspective on how data actually gets used by the people who rely on it.</p>
                    <p>Now I focus on building dashboards, automating reporting, and creating data systems that help teams work smarter. I'm looking for full-time data analyst roles, remote or in NC.</p>
                    <div class="about-hobbies">
                        <div class="hobby-card">
                            <div class="hobby-icon">🏗️</div>
                            <div class="hobby-name">Building Models</div>
                        </div>
                        <div class="hobby-card">
                            <div class="hobby-icon">🏃</div>
                            <div class="hobby-name">Sports and Fitness</div>
                        </div>
                        <div class="hobby-card">
                            <div class="hobby-icon">🍺</div>
                            <div class="hobby-name">Craft Breweries</div>
                        </div>
                    </div>
                </div>
                <div class="about-image animate">
                    <div class="about-image-wrapper">
                        <img src="headshot.png" alt="Davis Rapp">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="contact">
        <div class="contact-container">
            <div class="section-header">
                <div class="section-badge">Contact</div>
                <h2 class="section-title">Get In Touch</h2>
                <p class="section-subtitle">Looking for data and analytics roles in NC or remote.</p>
            </div>
            <div class="contact-links">
                <a href="mailto:drappanalysis@gmail.com" class="contact-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    drappanalysis@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/davis-rapp-2b7167128/" target="_blank" class="contact-link">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                </a>
                <a href="https://github.com/drapp3" target="_blank" class="contact-link">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    GitHub
                </a>
            </div>
        </div>
    </section>

    <footer>
        <p>&copy; 2026 Davis Rapp</p>
    </footer>

    <script>
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate').forEach(el => observer.observe(el));

        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 200) current = section.getAttribute('id');
            });
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
            });
        });

        const titles = ['Data Analyst', 'BI Analyst', 'Analytics Engineer'];
        let titleIndex = 0, charIndex = 0, isDeleting = false;
        const typedElement = document.querySelector('.typed');

        function type() {
            const currentTitle = titles[titleIndex];
            if (isDeleting) {
                typedElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }
            let typeSpeed = isDeleting ? 50 : 100;
            if (!isDeleting && charIndex === currentTitle.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    </script>
</body>
</html>
