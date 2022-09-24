// видалення не потрібних файлів
import del from "del";
export const reset = () => {
    return del(app.path.clean);
}