// === Clear Task ==================================================================================================================================================================================================================================================

// ==== Plugins ====================================================================================================================================================================================================================================================

import del from "del";

// =================================================================================================================================================================================================================================================================

// ==== Configs ====================================================================================================================================================================================================================================================

import path from "../config/path.js"

// =================================================================================================================================================================================================================================================================

// ==== Clearing deploy destination ================================================================================================================================================================================================================================

const clearTask = () => {
    return del(path.root);
};

// =================================================================================================================================================================================================================================================================

// ==== Exporting Task =============================================================================================================================================================================================================================================

export default clearTask;

// =================================================================================================================================================================================================================================================================

// =================================================================================================================================================================================================================================================================