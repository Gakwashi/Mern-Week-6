// Simple frontend with vanilla JS
class BugTracker {
    constructor() {
        this.bugs = [];
        this.init();
    }

    async init() {
        document.getElementById('bugForm').addEventListener('submit', (e) => this.createBug(e));
        await this.loadBugs();
    }

    async loadBugs() {
        try {
            const response = await fetch('http://localhost:5000/api/bugs');
            this.bugs = await response.json();
            this.renderBugs();
        } catch (error) {
            console.error('Failed to load bugs:', error);
        }
    }

    async createBug(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        try {
            const response = await fetch('http://localhost:5000/api/bugs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            });
            
            if (response.ok) {
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
                await this.loadBugs();
            }
        } catch (error) {
            console.error('Failed to create bug:', error);
        }
    }

    async updateBug(id, status) {
        try {
            await fetch(`http://localhost:5000/api/bugs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            await this.loadBugs();
        } catch (error) {
            console.error('Failed to update bug:', error);
        }
    }

    async deleteBug(id) {
        try {
            await fetch(`http://localhost:5000/api/bugs/${id}`, {
                method: 'DELETE'
            });
            await this.loadBugs();
        } catch (error) {
            console.error('Failed to delete bug:', error);
        }
    }

    renderBugs() {
        const container = document.getElementById('bugs');
        container.innerHTML = this.bugs.map(bug => `
            <div class="bug ${bug.status}">
                <h3>${bug.title}</h3>
                <p>${bug.description}</p>
                <small>Status: ${bug.status}</small>
                <div>
                    <button onclick="bugTracker.updateBug(${bug.id}, 'in-progress')">In Progress</button>
                    <button onclick="bugTracker.updateBug(${bug.id}, 'resolved')">Resolve</button>
                    <button onclick="bugTracker.deleteBug(${bug.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }
}

// Start the app
const bugTracker = new BugTracker();

// Intentional bug for debugging demo
function buggyFunction() {
    console.log('This function has a bug');
    const undefinedVariable = someUndefinedVariable; // This will cause an error
}