const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Tab</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>⭐</text></svg>">
    <style>
    /* Global styles */
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #e8f4ea;
        transition: background-color 0.3s ease;
    }
    
    /* Fixed element style */
    .fixed-elements {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: #e8f4ea;
        z-index: 1000;
        padding: 10px;
        transition: background-color 0.3s ease;
        height: 130px;
    }
    
    .fixed-elements h3 {
        position: absolute;
        top: 10px;
        left: 20px;
        margin: 0;
    }
    
    /* Center content style */
    .center-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 600px;
        text-align: center;
    }
    
    /*Administrator control panel style*/
    .admin-controls {
        position: fixed;
        top: 10px;
        right: 10px;
        font-size: 60%;
    }
    
    /* Add/delete control button style */
    .add-remove-controls {
        display: none;
        flex-direction: column;
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        align-items: center;
        gap: 10px;
    }
    
    .round-btn {
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        text-align: center;
        font-size: 24px;
        line-height: 40px;
        cursor: pointer;
        margin: 5px 0;
    }
    
    .add-btn { order: 1; }
    .remove-btn { order: 2; }
    .category-btn { order: 3; }
    .remove-category-btn { order: 4; }
    
    /* Main content area style */
    .content {
        margin-top: 140px;
        padding: 20px;
    }
    
    /*Search bar style*/
    .search-container {
        margin-top: 10px;
    }
    
    .search-bar {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }
    
    .search-bar input {
        width: 70%;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px 0 0 5px;
    }
    
    .search-bar button {
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-left: none;
        background-color: #f8f8;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
    }
    
    /* Search engine button style*/
    .search-engines {
        display: flex;
        justify-content: center;
        gap: 10px;
    }
    
    .search-engine {
        padding: 5px 10px;
        border: 1px solid #ccc;
        background-color: #f0f0f0;
        border-radius: 5px;
        cursor: pointer;
    }
    
    /* Theme switch button style */
    #theme-toggle {
        position: fixed;
        bottom: 50px;
        right: 20px;
        background-color: #b8c9d9;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        text-align: center;
        font-size: 24px;
        line-height: 40px;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease;
    }

    #theme-toggle:hover {
        background-color: #007bff;
    }

    /* Dialog box style */
    #dialog-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
    }
    
    #dialog-box {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        width: 300px;
    }
    
    #dialog-box input, #dialog-box select {
        width: 100%;
        margin-bottom: 10px;
        padding: 5px;
    }
    
    /* Category and card styles */
    .section {
        margin-bottom: 20px;
    }
    
    .section-title-container {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .section-title {
        font-size: 18px;
        font-weight: bold;
    }
    
    .delete-category-btn {
        background-color: #ff9800;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
    }
    
    .card-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .card {
        background-color: #b8c9d9;
        border-radius: 5px;
        padding: 10px;
        width: 150px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: transform 0.2s;
        position: relative;
        user-select: none;
    }
    
    .card:hover {
        transform: translateY(-5px);
    }
    
    .card-top {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }
    
    .card-icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
    }
    
    .card-title {
        font-size: 14px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .card-url {
        font-size: 12px;
        color: #666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .private-tag {
        background-color: #ff9800;
        color: white;
        font-size: 10px;
        padding: 2px 5px;
        border-radius: 3px;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    
    .delete-btn {
        position: absolute;
        top: -10px;
        right: -10px;
        background-color: red;
        color: white;
        border: none;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;
        display: none;
    }
    
    /*Copyright information style*/
    #copyright {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    }
    
    #copyright p {
        margin: 0;
    }
    
    #copyright a {
        color: #007bff;
        text-decoration: none;
    }
    
    #copyright a:hover {
        text-decoration: underline;
    }
    
    /* Responsive design */
    @media (max-width: 480px) {
        .fixed-elements {
            position: relative;
            padding: 5px;
        }
        .content {
            margin-top: 10px;
        }

        .admin-controls input,
        .admin-controls button {
            height: 30%;
        }

        .card-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        .card {
            width: 80%;
            max-width: 100%;
            padding: 5px;
        }
        .card-title {
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 130px;
        }
        .card-url {
            font-size: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 130px;
        }
        
        .add-remove-controls {
            right: 2px;
          }

        .round-btn,
        #theme-toggle {
            right: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            font-size: 24px;
        }
    }
    </style>
</head>

<body>
    <div class="fixed-elements">
        <h3>My Bookmarks</h3>
        <div class="center-content">
            <!-- One word module -->
            <p id="hitokoto">
                <a href="#" id="hitokoto_text"></a>
            </p>
            <script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script>
            <!-- Search Bar -->
            <div class="search-container">
                <div class="search-bar">
                    <input type="text" id="search-input" placeholder="">
                    <button id="search-button">🔍</button>
                </div>
                <div class="search-engines">
                    <button class="search-engine" data-engine="baidu">Baidu</button>
                    <button class="search-engine" data-engine="bing">Bing</button>
                    <button class="search-engine" data-engine="google">Google</button>
                </div>
            </div>
        </div>
        <!-- Administrator Control Panel -->
        <div class="admin-controls">
            <input type="password" id="admin-password" placeholder="Enter password">
            <button id="admin-mode-btn" onclick="toggleAdminMode()">Settings</button>
            <button id="secret-garden-btn" onclick="toggleSecretGarden()">Login</button>
        </div>
    </div>
    <div class="content">
        <!-- Add/remove control buttons-->
        <div class="add-remove-controls">
            <button class="round-btn add-btn" onclick="showAddDialog()">+</button>
            <button class="round-btn remove-btn" onclick="toggleRemoveMode()">-</button>
            <button class="round-btn category-btn" onclick="addCategory()">C+</button>
            <button class="round-btn remove-category-btn" onclick="toggleRemoveCategory()">C-</button>

        </div>

        <!-- Categories and Card Containers-->
        <div id="sections-container"></div>
        <!-- Theme switch button -->
        <button id="theme-toggle" onclick="toggleTheme()">◑</button>
        <!-- Add Link Dialog -->
        <div id="dialog-overlay">
            <div id="dialog-box">
                <label for="name-input">name</label>
                <input type="text" id="name-input">
                <label for="url-input">Address</label>
                <input type="text" id="url-input">
                <label for="category-select">Select a category</label>
                <select id="category-select"></select>
                <div class="private-link-container">
                    <label for="private-checkbox">Private Link</label>    
                    <input type="checkbox" id="private-checkbox">
                </div>
                <button onclick="addLink()">OK</button>
                <button onclick="hideAddDialog()">Cancel</button>
            </div>
        </div>
        <!-- Copyright Information -->
        <div id="copyright" class="copyright">
            <!--Please do not delete-->
            <p>Project address: <a href="https://github.com/hmhm2022/Card-Tab" target="_blank">GitHub</a> If you like it, please give it a star! </p>
        </div>
    </div>

    <script>
    // Search engine configuration
    const searchEngines = {
        baidu: "https://www.baidu.com/s?wd=",
        bing: "https://www.bing.com/search?q=",
        google: "https://www.google.com/search?q="
    };
    
    let currentEngine = "baidu";
    
    // Logging function
    function logAction(action, details) {
        const timestamp = new Date().toISOString();
        const logEntry = timestamp + ': ' + action + ' - ' + JSON.stringify(details);
        console.log(logEntry);
    }
    
    // Set the current search engine
    function setActiveEngine(engine) {
        currentEngine = engine;
        document.querySelectorAll('.search-engine').forEach(btn => {
            btn.style.backgroundColor = btn.dataset.engine === engine ? '#c0c0c0' : '#f0f0f0';
        });
        logAction('Set search engine', { engine });
    }
    
    // Search engine button click event
    document.querySelectorAll('.search-engine').forEach(button => {
        button.addEventListener('click', () => setActiveEngine(button.dataset.engine));
    });
    
    //Search button click event
    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value;
        if (query) {
            logAction('Execute search', { engine: currentEngine, query });
            window.open(searchEngines[currentEngine] + encodeURIComponent(query), '_blank');
        }
    });
    
    // Search input box enter event
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('search-button').click();
        }
    });
    
    // Initialize the search engine
    setActiveEngine(currentEngine);
    
    // Global variables
    let publicLinks = [];
    let privateLinks = [];
    let isAdmin = false;
    let isLoggedIn = false;
    let removeMode = false;
    let isRemoveCategoryMode = false;
    let isDarkTheme = false;
    let links = [];
    const categories = {};
    
    // Add a new category
    async function addCategory() {
        if (!await validateToken()) {
            return;
        }
        const categoryName = prompt('Please enter a new category name:');
        if (categoryName && !categories[categoryName]) {
            categories[categoryName] = [];
            updateCategorySelect();
            renderCategories();
            saveLinks();
            logAction('Add category', { categoryName, currentLinkCount: links.length });
        } else if (categories[categoryName]) {
            alert('This category already exists');
            logAction('Failed to add category', { categoryName, reason: 'Category already exists' });
        }
    }

    // Delete category
    async function deleteCategory(category) {
        if (!await validateToken()) {
            return;
        }
        if (confirm('Are you sure you want to delete the "' + category + '" category? This will delete all links under this category.')) {
            delete categories[category];
            links = links.filter(link => link.category !== category);
            publicLinks = publicLinks.filter(link => link.category !== category);
            privateLinks = privateLinks.filter(link => link.category !== category);
            updateCategorySelect();
            saveLinks();
            renderCategories();
            logAction('Delete category', { category });
        }
    }    

    // Render categories (do not reload links)
    function renderCategories() {
        const container = document.getElementById('sections-container');
        container.innerHTML = '';
    
        Object.keys(categories).forEach(category => {
            const section = document.createElement('div');
            section.className = 'section';
    
            const titleContainer = document.createElement('div');
            titleContainer.className = 'section-title-container';
    
            const title = document.createElement('div');
            title.className = 'section-title';
            title.textContent = category;
    
            titleContainer.appendChild(title);
    
            if (isAdmin) {
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete category';
                deleteBtn.className = 'delete-category-btn';
                deleteBtn.style.display = isRemoveCategoryMode ? 'inline-block' : 'none';
                deleteBtn.onclick = () => deleteCategory(category);
                titleContainer.appendChild(deleteBtn);
            }
    
            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';
            cardContainer.id = category;
    
            section.appendChild(titleContainer);
            section.appendChild(cardContainer);
    
            container.appendChild(section);
    
            const categoryLinks = links.filter(link => link.category === category);
            categoryLinks.forEach(link => {
                createCard(link, cardContainer);
            });
        });
    
        logAction('rendering categories', { categoryCount: Object.keys(categories).length, linkCount: links.length });
    }    
    
    // Read link data
    async function loadLinks() {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        // If logged in, get the token from localStorage and add it to the request header
        if (isLoggedIn) {
            const token = localStorage.getItem('authToken');
            if (token) {
                headers['Authorization'] = token;
            }
        }
        
        try {
            const response = await fetch('/api/getLinks?userId=testUser', {
                headers: headers
            });
            
            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }
            
            
            const data = await response.json();
            console.log('Received data:', data);
            
            if (data.categories) {
                Object.assign(categories, data.categories);
            }
            
            publicLinks = data.links ? data.links.filter(link => !link.isPrivate) : [];
            privateLinks = data.links ? data.links.filter(link => link.isPrivate) : [];
            links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

            loadSections();
            updateCategorySelect();
            updateUIState();
            logAction('Read link', {
                publicCount: publicLinks.length,
                privateCount: privateLinks.length,
                isLoggedIn: isLoggedIn,
                hasToken: !!localStorage.getItem('authToken')
            });
        } catch (error) {
            console.error('Error loading links:', error);
            alert('Error loading link, please refresh the page and try again');
        }
    }
    
    
    // Update UI status
    function updateUIState() {
        const passwordInput = document.getElementById('admin-password');
        const adminBtn = document.getElementById('admin-mode-btn');
        const secretGardenBtn = document.getElementById('secret-garden-btn');
        const addRemoveControls = document.querySelector('.add-remove-controls');
    
        passwordInput.style.display = isLoggedIn ? 'none' : 'inline-block';
        secretGardenBtn.textContent = isLoggedIn ? "Logout" : "Login";
        secretGardenBtn.style.display = 'inline-block';
    
        if (isAdmin) {
            adminBtn.textContent = "Leave settings";
            adminBtn.style.display = 'inline-block';
            addRemoveControls.style.display = 'flex';
        } else if (isLoggedIn) {
            adminBtn.textContent = "Settings";
            adminBtn.style.display = 'inline-block';
            addRemoveControls.style.display = 'none';
        } else {
            adminBtn.style.display = 'none';
            addRemoveControls.style.display = 'none';
        }
    
        logAction('Update UI status', { isAdmin, isLoggedIn });
    }
    
    // Login status display (load all links)
    function showSecretGarden() {
        if (isLoggedIn) {
            links = [...publicLinks, ...privateLinks];
            loadSections();
            // Display all private tags
            document.querySelectorAll('.private-tag').forEach(tag => {
                tag.style.display = 'block';
            });
            logAction('Show private garden');
        }
    }
    
    // Load categories and links
    function loadSections() {
        const container = document.getElementById('sections-container');
        container.innerHTML = '';
    
        Object.keys(categories).forEach(category => {
            const section = document.createElement('div');
            section.className = 'section';
    
            const titleContainer = document.createElement('div');
            titleContainer.className = 'section-title-container';
    
            const title = document.createElement('div');
            title.className = 'section-title';
            title.textContent = category;
    
            titleContainer.appendChild(title);
    
            if (isAdmin) {
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete category';
                deleteBtn.className = 'delete-category-btn';
                deleteBtn.style.display = 'none';
                deleteBtn.onclick = () => deleteCategory(category);
                titleContainer.appendChild(deleteBtn);
            }
    
            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';
            cardContainer.id = category;
    
            section.appendChild(titleContainer);
            section.appendChild(cardContainer);
    
            let privateCount = 0;
            let linkCount = 0;
    
            links.forEach(link => {
                if (link.category === category) {
                    if (link.isPrivate) privateCount++;
                    linkCount++;
                    createCard(link, cardContainer);
                }
            });
    
            if (privateCount < linkCount || isLoggedIn) {
                container.appendChild(section);
            }
        });
    
        logAction('Load categories and links', { isAdmin: isAdmin, linkCount: links.length, categoryCount: Object.keys(categories).length });
    }
    
    // Create a card
    function createCard(link, container) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('draggable', isAdmin);
        card.dataset.isPrivate = link.isPrivate;
    
        const cardTop = document.createElement('div');
        cardTop.className = 'card-top';
    
        // Define the default SVG icon
        const defaultIconSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke- linecap="round" stroke-linejoin="round">' +
        '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>' +
        '<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>' +
        '</svg>';
        
        // Create icon element
        const icon = document.createElement('img');
        icon.className = 'card-icon';
        // icon.src = 'https://api.iowen.cn/favicon/' + extractDomain(link.url) + '.png';
        icon.src = 'https://www.faviconextractor.com/favicon/' + extractDomain(link.url);
        icon.alt = 'Website Icon';
        
        // If the image fails to load, use the default SVG icon
        icon.onerror = function() {
            const svgBlob = new Blob([defaultIconSVG], {type: 'image/svg+xml'});
            const svgUrl = URL.createObjectURL(svgBlob);
            this.src = svgUrl;
            
            this.onload = () => URL.revokeObjectURL(svgUrl);
        };
        
        function extractDomain(url) {
            let domain;
            try {
                domain = new URL(url).hostname;
            } catch (e) {
                domain = url;
            }
            return domain;
        }
    
        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = link.name;
    
        cardTop.appendChild(icon);
        cardTop.appendChild(title);
    
        const url = document.createElement('div');
        url.className = 'card-url';
        url.textContent = link.url;
    
        card.appendChild(cardTop);
        card.appendChild(url);
    
        if (link.isPrivate) {
            const privateTag = document.createElement('div');
            privateTag.className = 'private-tag';
            privateTag.textContent = 'private';
            card.appendChild(privateTag);
        }
    
        const correctedUrl = link.url.startsWith('http://') || link.url.startsWith('https://') ? link.url : 'http://' + link.url;
    
        if (!isAdmin) {
            card.addEventListener('click', () => {
                window.open(correctedUrl, '_blank');
                logAction('Open link', { name: link.name, url: correctedUrl });
            });
        }
    
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '–';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function (event) {
            event.stopPropagation();
            removeCard(card);
        };
        card.appendChild(deleteBtn);
    
        updateCardStyle(card);
    
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragover', dragOver);
        card.addEventListener('dragend', dragEnd);
        card.addEventListener('drop', drop);
        card.addEventListener('touchstart', touchStart, { passive: false });
    
        if (isAdmin && removeMode) {
            deleteBtn.style.display = 'block';
        }
    
        if (isAdmin || (link.isPrivate && isLoggedIn) || !link.isPrivate) {
            container.appendChild(card);
        }
        // logAction('Create card', { name: link.name, isPrivate: link.isPrivate });
    }
    
    // Update the card style
    function updateCardStyle(card) {
        if (isDarkTheme) {
            card.style.backgroundColor = '#1e1e1e';
            card.style.color = '#ffffff';
            card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
        } else {
            card.style.backgroundColor = '#b8c9d9';
            card.style.color = '#333';
            card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Update the category selection drop-down box
    function updateCategorySelect() {
        const categorySelect = document.getElementById('category-select');
        categorySelect.innerHTML = '';
    
        Object.keys(categories).forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    
        logAction('Update category selection', { categoryCount: Object.keys(categories).length });
    }
    
    // Save the link data
    async function saveLinks() {
        if (isAdmin && !(await validateToken())) {
            return;
        }

        let allLinks = [...publicLinks, ...privateLinks];
    
        try {
            await fetch('/api/saveOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    userId: 'testUser',
                    links: allLinks,
                    categories: categories
                }),
            });
            logAction('Save link', { linkCount: allLinks.length, categoryCount: Object.keys(categories).length });
        } catch (error) {
            logAction('Failed to save link', { error: error.message });
            alert('Failed to save link, please try again');
        }
    }
    
    // Add a card popup
    async function addLink() {
        if (!await validateToken()) {
            return;
        }
        const name = document.getElementById('name-input').value;
        const url = document.getElementById('url-input').value;
        const category = document.getElementById('category-select').value;
        const isPrivate = document.getElementById('private-checkbox').checked;
    
        if (name && url && category) {
            const newLink = { name, url, category, isPrivate };
    
            if (isPrivate) {
                privateLinks.push(newLink);
            } else {
                publicLinks.push(newLink);
            }
    
            links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;
    
            if (isAdmin || (isPrivate && isLoggedIn) || !isPrivate) {
                const container = document.getElementById(category);
                if (container) {
                    createCard(newLink, container);
                } else {
                    categories[category] = [];
                    renderCategories();
                }
            }
    
            saveLinks();
    
            document.getElementById('name-input').value = '';
            document.getElementById('url-input').value = '';
            document.getElementById('private-checkbox').checked = false;
            hideAddDialog();

            logAction('Add card', { name, url, category, isPrivate });
        }
    }

    // Delete the card
    async function removeCard(card) {
        if (!await validateToken()) {
            return;
        }
        const name = card.querySelector('.card-title').textContent;
        const url = card.querySelector('.card-url').textContent;
        const isPrivate = card.dataset.isPrivate === 'true';
        
        links = links.filter(link => link.url !== url);
        if (isPrivate) {
            privateLinks = privateLinks.filter(link => link.url !== url);
        } else {
            publicLinks = publicLinks.filter(link => link.url !== url);
        }
    
        for (const key in categories) {
            categories[key] = categories[key].filter(link => link.url !== url);
        }
    
        card.remove();
    
        saveLinks();
    
        logAction('Delete card', { name, url, isPrivate });
    }
    
    // Drag the card
    let draggedCard = null;
    let touchStartX, touchStartY;
    
    // Drag the card on the touch screen
    function touchStart(event) {
        if (!isAdmin) {
            return;
        }
        draggedCard = event.target.closest('.card');
        if (!draggedCard) return;
    
        event.preventDefault();
        const touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    
        draggedCard.classList.add('dragging');
        
        document.addEventListener('touchmove', touchMove, { passive: false });
        document.addEventListener('touchend', touchEnd);
    
    }
    
    function touchMove(event) {
        if (!draggedCard) return;
        event.preventDefault();
    
        const touch = event.touches[0];
        const currentX = touch.clientX;
        const currentY = touch.clientY;

        const deltaX = currentX - touchStartX;
        const deltaY = currentY - touchStartY;
        draggedCard.style.transform = "translate(" + deltaX + "px, " + deltaY + "px)";
    
        const target = findCardUnderTouch(currentX, currentY);
        if (target && target !== draggedCard) {
            const container = target.parentElement;
            const targetRect = target.getBoundingClientRect();
    
            if (currentX < targetRect.left + targetRect.width / 2) {
                container.insertBefore(draggedCard, target);
            } else {
                container.insertBefore(draggedCard, target.nextSibling);
            }
        }
    }
    
    function touchEnd(event) {
        if (!draggedCard) return;
    
        const card = draggedCard;
        const targetCategory = card.closest('.card-container').id;
    
        validateToken().then(isValid => {
            if (isValid && card) {
                updateCardCategory(card, targetCategory);
                saveCardOrder().catch(error => {
                    console.error('Save failed:', error);
                });
            }
            cleanupDragState();
        });
    }
    
    function findCardUnderTouch(x, y) {
        const cards = document.querySelectorAll('.card:not(.dragging)');
        return Array.from(cards).find(card => {
            const rect = card.getBoundingClientRect();
            return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
        });
    }

    // PC side drag card
    function dragStart(event) {
        if (!isAdmin) {
            event.preventDefault();
            return;
        }
        draggedCard = event.target.closest('.card');
        if (!draggedCard) return;
    
        draggedCard.classList.add('dragging');
        event.dataTransfer.effectAllowed = "move";
        logAction('Start dragging the card', { name: draggedCard.querySelector('.card-title').textContent });
    }
    
    function dragOver(event) {
        if (!isAdmin) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const target = event.target.closest('.card');
        if (target && target !== draggedCard) {
            const container = target.parentElement;
            const mousePositionX = event.clientX;
            const targetRect = target.getBoundingClientRect();
    
            if (mousePositionX < targetRect.left + targetRect.width / 2) {
                container.insertBefore(draggedCard, target);
            } else {
                container.insertBefore(draggedCard, target.nextSibling);
            }
        }
    }
    
    //Clear drag status function
    function cleanupDragState() {
        if (draggedCard) {
            draggedCard.classList.remove('dragging');
            draggedCard.style.transform = '';
            draggedCard = null;
        }
        
        document.removeEventListener('touchmove', touchMove);
        document.removeEventListener('touchend', touchEnd);
        
        touchStartX = null;
        touchStartY = null;
    }

    // PC end dragging
    function drop(event) {
        if (!isAdmin) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        
        const card = draggedCard;
        const targetCategory = event.target.closest('.card-container').id;
        
        validateToken().then(isValid => {
            if (isValid && card) {
                updateCardCategory(card, targetCategory);
                saveCardOrder().catch(error => {
                    console.error('Save failed:', error);
                });
            }
            cleanupDragState();
        });
    }

    function dragEnd(event) {
        if (draggedCard) {
            draggedCard.classList.remove('dragging');
            logAction('Drag the card to end');
        }
    }
  
    // Update card categories
    function updateCardCategory(card, newCategory) {
        const cardTitle = card.querySelector('.card-title').textContent;
        const cardUrl = card.querySelector('.card-url').textContent;
        const isPrivate = card.dataset.isPrivate === 'true';
    
        const linkIndex = links.findIndex(link => link.url === cardUrl);
        if (linkIndex !== -1) {
            links[linkIndex].category = newCategory;
        }
    
        const linkArray = isPrivate ? privateLinks : publicLinks;
        const arrayIndex = linkArray.findIndex(link => link.url === cardUrl);
        if (arrayIndex !== -1) {
            linkArray[arrayIndex].category = newCategory;
        }
    
        card.dataset.category = newCategory;
    }

    // Add touch event listener after the page is loaded
    document.addEventListener('DOMContentLoaded', function() {
        const cardContainers = document.querySelectorAll('.card-container');
        cardContainers.forEach(container => {
            container.addEventListener('touchstart', touchStart, { passive: false });
        });
    });    
    
    // Save the card order
    async function saveCardOrder() {
        if (!await validateToken()) {
            return;
        }
        const containers = document.querySelectorAll('.card-container');
        let newPublicLinks = [];
        let newPrivateLinks = [];
        let newCategories = {};
    
        containers.forEach(container => {
            const category = container.id;
            newCategories[category] = [];
    
            [...container.children].forEach(card => {
                const url = card.querySelector('.card-url').textContent;
                const name = card.querySelector('.card-title').textContent;
                const isPrivate = card.dataset.isPrivate === 'true';
                card.dataset.category = category;
                const link = { name, url, category, isPrivate };
                if (isPrivate) {
                    newPrivateLinks.push(link);
                } else {
                    newPublicLinks.push(link);
                }
                newCategories[category].push(link);
            });
        });
    
        publicLinks.length = 0;
        publicLinks.push(...newPublicLinks);
        privateLinks.length = 0;
        privateLinks.push(...newPrivateLinks);
        Object.keys(categories).forEach(key => delete categories[key]);
        Object.assign(categories, newCategories);
    
        logAction('Save card order', {
            publicCount: newPublicLinks.length,
            privateCount: newPrivateLinks.length,
            categoryCount: Object.keys(newCategories).length
        });
    
        try {
            const response = await fetch('/api/saveOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    userId: 'testUser',
                    links: [...newPublicLinks, ...newPrivateLinks],
                    categories: newCategories
                }),
            });
            const result = await response.json();
            if (!result.success) {
                throw new Error('Failed to save order');
            }
            logAction('Save card order', { publicCount: newPublicLinks.length, privateCount: newPrivateLinks.length, categoryCount: Object.keys(newCategories).length });
        } catch (error) {
            logAction('Failed to save order', { error: error.message });
            alert('Failed to save order, please try again');
        }
    }             
    
    // Set the state to reload the card
    function reloadCardsAsAdmin() {
        document.querySelectorAll('.card-container').forEach(container => {
            container.innerHTML = '';
        });
        loadLinks().then(() => {
            if (isDarkTheme) {
                applyDarkTheme();
            }
        });
        logAction('Reload card (administrator mode)');
    }
    
    // Password input box enter event
    document.getElementById('admin-password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            toggleSecretGarden();
        }
    });
    
    // Toggle setting state
    async function toggleAdminMode() {
        const adminBtn = document.getElementById('admin-mode-btn');
        const addRemoveControls = document.querySelector('.add-remove-controls');
    
        if (!isAdmin && isLoggedIn) {
            if (!await validateToken()) {
                return;
            }

            // Make a backup before entering setup mode
            try {
                const response = await fetch('/api/backupData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('authToken')
                    },
                    body: JSON.stringify({
                        sourceUserId: 'testUser',
                        backupUserId: 'backup'
                    }),
                });
                const result = await response.json();
                if (result.success) {
                    logAction('Data backup successful');
                } else {
                    throw new Error('Backup failed');
                }
            } catch (error) {
                logAction('Data backup failed', { error: error.message });
                if (!confirm('Backup failed, do you still want to continue to enter the setup mode?')) {
                    return;
                }
            }

            isAdmin = true;
            adminBtn.textContent = "Exit settings";
            addRemoveControls.style.display = 'flex';
            alert('Ready to set categories and bookmarks');
            reloadCardsAsAdmin();
            logAction('Enter settings');
        } else if (isAdmin) {
            isAdmin = false;
            removeMode = false;
            adminBtn.textContent = "Settings";
            addRemoveControls.style.display = 'none';
            alert('Settings saved');
            reloadCardsAsAdmin();
            logAction('Leave settings');
        }
    
        updateUIState();
    }
    
    // Switch to login state
    function toggleSecretGarden() {
        const passwordInput = document.getElementById('admin-password');
        if (!isLoggedIn) {
            verifyPassword(passwordInput.value)
                .then(result => {
                    if (result.valid) {
                        isLoggedIn = true;
                        localStorage.setItem('authToken', result.token);
                        console.log('Token saved:', result.token);
                        loadLinks();
                        alert('Login successful!');
                        logAction('Login successful');
                    } else {
                        alert('Wrong password');
                        logAction('Login failed', { reason: result.error || 'Wrong password' });
                    }
                    updateUIState();
                })
                .catch(error => {
                    console.error('Login error:', error);
                    alert('Login error, please try again');
                });
        } else {
            isLoggedIn = false;
            isAdmin = false;
            localStorage.removeItem('authToken');
            links = publicLinks;
            loadSections();
            alert('Log out!');
            updateUIState();
            passwordInput.value = '';
            logAction('Log out');
        }
    }
    
    // Apply dark theme
    function applyDarkTheme() {
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#ffffff';
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.backgroundColor = '#1e1e1e';
            card.style.color = '#ffffff';
            card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
        });
        logAction('Apply dark theme');
    }
    
    // Display the add link dialog
    function showAddDialog() {
        document.getElementById('dialog-overlay').style.display = 'flex';
        logAction('Show add link dialog');
    }
    
    // Hide the add link dialog
    function hideAddDialog() {
        document.getElementById('dialog-overlay').style.display = 'none';
        logAction('Hide add link dialog');
    }
    
    // Switch to delete card mode
    function toggleRemoveMode() {
        removeMode = !removeMode;
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.style.display = removeMode ? 'block' : 'none';
        });
        logAction('Switch to delete card mode', { removeMode });
    }
    
    //Switch to delete category mode
    function toggleRemoveCategory() {
        isRemoveCategoryMode = !isRemoveCategoryMode;
        const deleteButtons = document.querySelectorAll('.delete-category-btn');
        deleteButtons.forEach(btn => {
            btn.style.display = isRemoveCategoryMode ? 'inline-block' : 'none';
        });
        logAction('Switch to delete category mode', { isRemoveCategoryMode });
    }
    
    // Switch themes
    function toggleTheme() {
        isDarkTheme = !isDarkTheme;
    
        document.body.style.backgroundColor = isDarkTheme ? '#121212' : '#e8f4ea';
        document.body.style.color = isDarkTheme ? '#ffffff' : '#333';
    
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.backgroundColor = isDarkTheme ? '#1e1e1e' : '#b8c9d9';
            card.style.color = isDarkTheme ? '#ffffff' : '#333';
            card.style.boxShadow = isDarkTheme
                ? '0 4px 8px rgba(0, 0, 0, 0.5)'
                : '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
    
        const fixedElements = document.querySelectorAll('.fixed-elements');
        fixedElements.forEach(element => {
            element.style.backgroundColor = isDarkTheme ? '#121212' : '#e8f4ea';
            element.style.color = isDarkTheme ? '#ffffff' : '#333';
        });
    
        const dialogBox = document.getElementById('dialog-box');
        dialogBox.style.backgroundColor = isDarkTheme ? '#1e1e1e' : '#ffffff';
        dialogBox.style.color = isDarkTheme ? '#ffffff' : '#333';
    
        const inputs = document.querySelectorAll('input[type="text"], input[type="password"], select');
        inputs.forEach(input => {
            input.style.backgroundColor = isDarkTheme ? '#444' : '#fff';
            input.style.color = isDarkTheme ? '#fff' : '#333';
            input.style.borderColor = isDarkTheme ? '#555' : '#ccc';
        });
        
        logAction('Switch theme', { isDarkTheme });
    }
    
    // Verify password
    async function verifyPassword(inputPassword) {
        const response = await fetch('/api/verifyPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: inputPassword }),
        });
        const result = await response.json();
        return result;
    }
    
    // Initialize loading
    document.addEventListener('DOMContentLoaded', async () => {
        await validateToken();
        loadLinks();
    });


    // Front-end checks whether there is a token
    async function validateToken() {
        const token = localStorage.getItem('authToken');
        if (!token) {
            isLoggedIn = false;
            updateUIState();
            return false;
        }

        try {
            const response = await fetch('/api/getLinks?userId=testUser', {
                headers: { 'Authorization': token }
            });
            
            if (response.status === 401) {
                await resetToLoginState('token has expired, please log in again');
                return false;
            }
            
            isLoggedIn = true;
            updateUIState();
            return true;
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    }

    // Reset state
    async function resetToLoginState(message) {
        alert(message);
        
        cleanupDragState();
        
        localStorage.removeItem('authToken');
        isLoggedIn = false;
        isAdmin = false;
        removeMode = false;
        isRemoveCategoryMode = false;
        
        const passwordInput = document.getElementById('admin-password');
        if (passwordInput) {
            passwordInput.value = '';
        }
        
        updateUIState();
        links = publicLinks;
        loadSections();
        
        const addRemoveControls = document.querySelector('.add-remove-controls');
        if (addRemoveControls) {
            addRemoveControls.style.display = 'none';
        }
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.style.display = 'none';
        });
        
        document.querySelectorAll('.delete-category-btn').forEach(btn => {
            btn.style.display = 'none';
        });
        
        const dialogOverlay = document.getElementById('dialog-overlay');
        if (dialogOverlay) {
            dialogOverlay.style.display = 'none';
        }
    }

    </script>
</body>

</html>
`;

// Server token verification
async function validateServerToken(authToken, env) {
    if (!authToken) {
        return {
            isValid: false,
            status: 401,
            response: { error: 'Unauthorized', message: 'Not logged in or login has expired' }
        };
    }

    try {
        const [timestamp, hash] = authToken.split('.');
        const tokenTimestamp = parseInt(timestamp);
        const now = Date.now();
        
        const FIFTEEN_MINUTES = 15 * 60 * 1000;
        if (now - tokenTimestamp > FIFTEEN_MINUTES) {
            return {
                isValid: false,
                status: 401,
                response: {
                    error: 'Token expired',
                    tokenExpired: true,
                    message: 'Login has expired, please log in again'
                }
            };
        }
        
        const tokenData = timestamp + "_" + env.ADMIN_PASSWORD;
        const encoder = new TextEncoder();
        const data = encoder.encode(tokenData);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const expectedHash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
        
        if (hash !== expectedHash) {
            return {
                isValid: false,
                status: 401,
                response: {
                    error: 'Invalid token',
                    tokenInvalid: true,
                    message: 'Login status is invalid, please log in again'
                }
            };
        }

        return { isValid: true };
    } catch (error) {
        return {
            isValid: false,
            status: 401,
            response: {
                error: 'Invalid token',
                tokenInvalid: true,
                message: 'Login verification failed, please log in again'
            }
        };
    }
}

export default {
    async fetch(request, env) {
      const url = new URL(request.url);
  
      if (url.pathname === '/') {
        return new Response(HTML_CONTENT, {
          headers: { 'Content-Type': 'text/html' }
        });
      }
  
      if (url.pathname === '/api/getLinks') {
        const userId = url.searchParams.get('userId');
        const authToken = request.headers.get('Authorization');
        const data = await env.CARD_ORDER.get(userId);
  
        if (data) {
            const parsedData = JSON.parse(data);
            
            // Verify token
            if (authToken) {
                const validation = await validateServerToken(authToken, env);
                if (!validation.isValid) {
                    return new Response(JSON.stringify(validation.response), {
                        status: validation.status,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                // Token is valid, return complete data
                return new Response(JSON.stringify(parsedData), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            
            // No token is provided, only public data is returned
            const filteredLinks = parsedData.links.filter(link => !link.isPrivate);
            const filteredCategories = {};
            Object.keys(parsedData.categories).forEach(category => {
                filteredCategories[category] = parsedData.categories[category].filter(link => !link.isPrivate);
            });
  
            return new Response(JSON.stringify({
                links: filteredLinks,
                categories: filteredCategories
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }
  
        return new Response(JSON.stringify({
            links: [],
            categories: {}
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
      }
  
      if (url.pathname === '/api/saveOrder' && request.method === 'POST') {
        const authToken = request.headers.get('Authorization');
        const validation = await validateServerToken(authToken, env);
        
        if (!validation.isValid) {
            return new Response(JSON.stringify(validation.response), {
                status: validation.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { userId, links, categories } = await request.json();
        await env.CARD_ORDER.put(userId, JSON.stringify({ links, categories }));
        return new Response(JSON.stringify({
            success: true,
            message: 'Save successfully'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
      }
  
      if (url.pathname === '/api/verifyPassword' && request.method === 'POST') {
        try {
            const { password } = await request.json();
            const isValid = password === env.ADMIN_PASSWORD;
            
            if (isValid) {
                // Generate an encrypted token containing a timestamp
                const timestamp = Date.now();
                const tokenData = timestamp + "_" + env.ADMIN_PASSWORD;
                const encoder = new TextEncoder();
                const data = encoder.encode(tokenData);
                const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                
                // Use the specified format: timestamp.hash
                const token = timestamp + "." + btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
                
                return new Response(JSON.stringify({
                    valid: true,
                    token: token
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            
            return new Response(JSON.stringify({
                valid: false,
                error: 'Invalid password'
            }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            return new Response(JSON.stringify({
                valid: false,
                error: error.message
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
      }
  
      if (url.pathname === '/api/backupData' && request.method === 'POST') {
        const { sourceUserId } = await request.json();
        const result = await this.backupData(env, sourceUserId);
        return new Response(JSON.stringify(result), {
          status: result.success ? 200 : 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }  
  
      return new Response('Not Found', { status: 404 });
    },
  
    async backupData(env, sourceUserId) {
        const MAX_BACKUPS = 10;
        const sourceData = await env.CARD_ORDER.get(sourceUserId);
        
        if (sourceData) {
            try {
                const currentDate = new Date().toLocaleString('zh-CN', {
                    timeZone: 'Asia/Shanghai',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }).replace(/\//g, '-');
                
                const backupId = `backup_${currentDate}`;
                
                const backups = await env.CARD_ORDER.list({ prefix: 'backup_' });
                const backupKeys = backups.keys.map(key => key.name).sort((a, b) => {
                    const timeA = new Date(a.split('_')[1].replace(/-/g, '/')).getTime();
                    const timeB = new Date(b.split('_')[1].replace(/-/g, '/')).getTime();
                    return timeB - timeA; // Sort in descending order, with the latest one at the front
                });
                
                await env.CARD_ORDER.put(backupId, sourceData);
                
                const allBackups = [...backupKeys, backupId].sort((a, b) => {
                    const timeA = new Date(a.split('_')[1].replace(/-/g, '/')).getTime();
                    const timeB = new Date(b.split('_')[1].replace(/-/g, '/')).getTime();
                    return timeB - timeA;
                });
                
                const backupsToDelete = allBackups.slice(MAX_BACKUPS);
                
                if (backupsToDelete.length > 0) {
                    await Promise.all(
                        backupsToDelete.map(key => env.CARD_ORDER.delete(key))
                    );
                }
    
                return {
                    success: true,
                    backupId,
                    remainingBackups: MAX_BACKUPS,
                    deletedCount: backupsToDelete.length
                };
            } catch (error) {
                return {
                    success: false,
                    error: 'Backup operation failed',
                    details: error.message
                };
            }
        }
        return { success: false, error: 'Source data not found' };
    }
  };
