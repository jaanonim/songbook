import config from '../Config/config';
import ProcessSearchstring from '../Utilities/search';


async function getSongs(args:any) {
    const search = args.queryKey[1];
    const page = args.pageParam || 0;   
    let url = `${config.apiUrl}/song?page=${page}`
    if(search){
        const { q, tags } = ProcessSearchstring(search);
        url += (q != null ? `&q=${q}`:'');
        url += (tags != null ? `&tags=${tags}`:'');
    }

    return fetch(url).then(res =>
        res.json()
      )
}

export {getSongs};
