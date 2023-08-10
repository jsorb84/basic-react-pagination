# basic-react-pagination (first attempt)
This is my very first attempt at pagination. Very basic class. Written with Typescript

``new Paginator<T>`` ```( {dataArray: Array<T>, perPage: number, state: useState(1)} )```
* `dataArray` The array of data to paginate
* `perPage` The number of items per page
* `state` This should be passed a new state for the page. (just pass useState(1))

