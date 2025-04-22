const BASE_URL = import.meta.env.VITE_BASE_URL;
export const notesEndpoints = {
    CREATE_NOTES: `${BASE_URL}/notes/create`,
    UPDATE_NOTES: `${BASE_URL}/notes/update`,
    DELETE_NOTES: `${BASE_URL}/notes/delete`,
    GET_ALL_NOTES: `${BASE_URL}/notes/all`,
    GET_ADMIN_NOTES: `${BASE_URL}/notes/admin`,
    DOWNLOAD_NOTES: `${BASE_URL}/notes/download`,
};