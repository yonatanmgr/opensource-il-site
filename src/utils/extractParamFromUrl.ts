export function parseLastParamFromUrl(pathname: string) {
  try {
    if (!pathname?.length || !pathname.includes('/')) {
      throw new Error('invalid pathname: ' + pathname);
    }
    const lastParam = pathname.split('/').pop();
    return lastParam?.includes('?') ? lastParam.split('?')[0] : lastParam;
  } catch (error) {
    console.log(
      '🚀 ~ file: extractParamFromUrl.ts:11 ~ extractLastParamFromUrl ~ error:',
      error
    );

    return null;
  }
}

export function parseSearchParams(searchParams: string) {
  try {
    if (!searchParams.length || !searchParams.includes('=')) {
      throw new Error('invalid searchParams: ' + searchParams);
    }
    const queryParamEntries = searchParams.split('&');

    return queryParamEntries.reduce((acc: any, item: string) => {
      if (!item.includes('=')) {
        console.warn(
          '🚀 ~ file: extractParamFromUrl.ts:27 ~ returnqueryParamEntries.reduce ~ item ~ invalid query param:',
          item
        );
        throw new Error(
          'extractParamFromUrl - reducer got invalid query param: ' +
            item +
            ' searchParams: ' +
            searchParams
        );
      }
      const entry = item.split('=');
      acc[entry[0]] = entry[1];
      return acc;
    }, {});
  } catch (error) {
    console.error(
      '🚀 ~ file: extractParamFromUrl.ts:13 ~ extractParamFromUrl ~ error:',
      error
    );
    return null;
  }
}
