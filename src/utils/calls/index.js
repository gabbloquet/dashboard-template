/**
 * It is used to handle JSON Response.
 * @param {object} response - The response
 * @returns {object} - The JSON content or throw an error if it's not OK.
 */
export const handleJSONResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Something went wrong.');
};