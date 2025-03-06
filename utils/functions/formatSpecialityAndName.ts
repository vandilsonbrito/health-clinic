export function formatSpecialityAndName(selectedEspeciality: string[]) {
    const removeTitleName: string = selectedEspeciality[0]?.substring(selectedEspeciality[0]?.indexOf(' ') + 1)
    const formattedName: string = removeTitleName?.toLowerCase().replaceAll(' ', '-');
    const formattedespeciality: string = selectedEspeciality[1]?.toLowerCase();

    return { formattedName, formattedespeciality }
}