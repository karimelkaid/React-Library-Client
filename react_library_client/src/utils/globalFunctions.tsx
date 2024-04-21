/*
        goTo :
            Navigates to the specified path using the HTML5 history API.
        Parameter(s) :
            - path: string : The path to navigate to
        Return :
            - None
    */
export function goTo(path: string) {
    window
        .history
        .pushState({}, '', path);

    window.dispatchEvent(new Event('popstate'));
}
