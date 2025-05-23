import { Project } from './Project';
const baseUrl = 'http://localhost:4000';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkStatus(response: any) {
    if (response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

        const errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
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

const projectAPI = {
    get(page = 1, limit = 20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
            .then(delay(600))
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToProjectModels)
            .catch((error: TypeError) => {
                console.log('log client error ' + error);
                throw new Error(
                    'There was an error retrieving the projects. Please try again.'
                );
            });
    },

    async put(project: Project) {
        try {
            const response = await fetch(`${url}/${project.id}`, {
                method: 'PUT',
                body: JSON.stringify(project),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response_1 = await checkStatus(response);
            return parseJSON(response_1);
        } catch (error) {
            console.log('log client error ' + error);
            throw new Error(
                'There was an error updating the project. Please try again.'
            );
        }
    },

    async find(id: number) {
        const response = await fetch(`${url}/${id}`);
        const response_1 = await checkStatus(response);
        const item = await parseJSON(response_1);
        return convertToProjectModel(item);
    },

};

export { projectAPI };