// Simple frontend tests
describe('BugTracker', () => {
    test('should render bugs', () => {
        document.body.innerHTML = '<div id="bugs"></div>';
        const bugTracker = new BugTracker();
        bugTracker.bugs = [{ id: 1, title: 'Test', description: 'Test', status: 'open' }];
        bugTracker.renderBugs();
        
        expect(document.getElementById('bugs').innerHTML).toContain('Test');
    });

    test('should handle form submission', () => {
        document.body.innerHTML = `
            <form id="bugForm">
                <input id="title" value="Test Bug">
                <textarea id="description">Test Description</textarea>
            </form>
        `;
        
        const bugTracker = new BugTracker();
        const submitEvent = new Event('submit');
        document.getElementById('bugForm').dispatchEvent(submitEvent);
    });
});