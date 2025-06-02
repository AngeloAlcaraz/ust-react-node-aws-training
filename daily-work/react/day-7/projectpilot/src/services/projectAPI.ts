import { Project } from '../models/Project';
const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/projects`;

function translateStatusToErrorMessage(status: number) {
    switch (status) {
        case 401:
            return 'Please login again.';
        case 403:
            return 'You do not have permission to view the project(s).';
        default:
            return 'There was an error retrieving the project(s). Please try again.';
    }
}

async function checkStatus(response: Response) {
    if (response.ok) {
        return response;
    } else {
        let errorBody = null;
        try {
            errorBody = await response.json();
        } catch { /* empty */ }

        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
            body: errorBody,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

        const errorMessage =
            (errorBody && errorBody.message
                ? Array.isArray(errorBody.message)
                    ? errorBody.message.join('\n')
                    : errorBody.message
                : translateStatusToErrorMessage(httpErrorInfo.status)) || 'Unknown error';

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error = new Error(errorMessage) as any;
        error.response = {
            data: errorBody,
        };
        throw error;
    }
}

function parseJSON(response: Response) {
    return response.json();
}

function delay(ms: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (x: any): Promise<any> {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertToProjectModels(data: any[]): Project[] {
    const projects: Project[] = data.map(convertToProjectModel);
    return projects;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertToProjectModel(item: any): Project {
    return new Project(item);
}

const ProjectAPI = {
    //Get all projects with pagination and sorting
    get(page = 1, limit = 20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
            .then(delay(600))
            .then(checkStatus)
            .then(parseJSON)
            .then(result => {
                console.log('API response:', result);
                return convertToProjectModels(result.data || result);
            })
            .catch((error: TypeError) => {
                console.log('log client error ' + error);
                throw new Error(
                    'There was an error retrieving the projects. Please try again.'
                );
            });
    },

    //Update a project
    async put(project: Project): Promise<Project> {
        try {            
            const { _id, ...dataWithoutId } = project;           

            const apiResponse = await fetch(`${url}/${_id}`, {
                method: 'PUT',
                body: JSON.stringify(dataWithoutId),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            await checkStatus(apiResponse);
            const updatedProjectData = await parseJSON(apiResponse);
            return convertToProjectModel(updatedProjectData.data);

        } catch (error) {
            console.log('log client error:', error);
            throw error;
        }
    },

    //Find a project by ID
    async find(id: string) {
        const apiResponse = await fetch(`${url}/${id}`);
        const responseData = await checkStatus(apiResponse);
        const item = await parseJSON(responseData);
        return convertToProjectModel(item.data);
    },

    //Create a new project
    async post(project: Omit<Project, '_id'>) {
        try {

            // Temporary default image URL
            if (!project.imageUrl) {
                project.imageUrl = '/assets/placeimg_500_300_arch5.jpg';
            }

            const apiResponse = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(project),
                headers: { 'Content-Type': 'application/json' },
            });

            const responseBody = await apiResponse.json();

            if (!apiResponse.ok) {
                const error = new Error('Validation error');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (error as any).response = { data: responseBody };
                throw error;
            }

            return convertToProjectModel(responseBody);

        } catch (error) {
            console.log('log client error:', error);
            throw error;
        }
    },

    //Delete a project by ID
    async delete(id: string) {
        console.log('Deleting project with ID:', id);
        try {
            const apiResponse = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });
            const responseData = await checkStatus(apiResponse);
            return parseJSON(responseData);
        } catch (error) {
            console.log('log client error ' + error);
            throw new Error('There was an error deleting the project. Please try again.');
        }
    },
};

export { ProjectAPI };