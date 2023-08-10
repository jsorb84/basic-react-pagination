import Button from "@mui/joy/Button";
import { Typography } from "@mui/joy";
/**
 * PaginatorContructor<T>
 * dataArray: the data array with all data @Array<T>
 * perPage: the number of items per page
 * state: takes useState(1) being the state for the current page
 * @interface
 */
interface PaginatorConstructor<T = any> {
	dataArray: Array<T>;
	perPage: number;
	state: [number, React.Dispatch<React.SetStateAction<number>>];
}
/**
 * Paginator<T>
 *
 * @constructor Takes a PaginatorConstructor<T> @interface
 *
 * _data: Array<T> the page date @private
 * perPage: number the number of items per page @public
 * _startIndex: the page start index @private
 * _endIndex: the page end index @private
 * _size: the number of items all together @private
 * _dataSource: the data source (all data) @private
 *
 * React State
 * currentPage: number the current page @public
 * setCurrentPage: React.Dispatch<React.SetStateAction<number>> @function
 *
 * Getters:
 * pages: number the number of computer pages @get
 * page: The current page items @public
 * buttons: Back and forward buttons JSX.Element
 */
export default class Paginator<T> {
	private _data: Array<T> = [];
	public perPage: number = 10;

	private _startIndex: number = 1;
	private _endIndex: number = 10;
	private _size: number;
	// The full data source
	private _dataSource: Array<T>;

	// React State
	public currentPage: number = 1;
	public setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

	public get pages(): number {
		// If there are less products than items per page, then there's one page.
		if (this._size <= this.perPage) {
			return 1;
		}
		return Math.ceil(this._size / this.perPage);
	}

	public get PageData() {
		return this.page;
	}
	// Bind the state to the buttom component
	public get buttons(): JSX.Element {
		// Check if the data isn't empty, or if the state is set
		if (!this._data || !this.setCurrentPage) {
			return <>Error - Reinitialize Class</>;
		}

		return (
			<>
				<div style={{ padding: 1 }}>
					<Typography
						startDecorator={
							<Button
								color="danger"
								onClick={() => {
									if (this.currentPage == 1) return;
									this.setCurrentPage(this.currentPage - 1);
								}}
							>
								Previous Page
							</Button>
						}
						endDecorator={
							<Button
								color="success"
								onClick={() => {
									if (this.currentPage == this.pages) return;
									this.setCurrentPage(this.currentPage + 1);
								}}
							>
								Next Page
							</Button>
						}
					/>
				</div>
				<div style={{ padding: 2 }}>
					Viewing Page {this.currentPage} out of {this.pages} - Total{" "}
					{this._size}
				</div>
			</>
		);
	}
	private get page(): Array<T> {
		const pg = this.currentPage;
		// Should update the start and end index based on page
		if (pg > this.pages || pg <= 0) return [];
		// If the page is the last page, the end index should be the
		this._startIndex = (pg - 1) * this.perPage;
		if (pg === this.pages) {
			this._endIndex = this._size;
		} else {
			this._endIndex = pg * this.perPage;
		}
		this._data = this._dataSource.slice(this._startIndex, this._endIndex);
		return this._data;
	}

	constructor({ dataArray, perPage, state }: PaginatorConstructor) {
		this._dataSource = dataArray;
		this.perPage = perPage;
		this._size = dataArray.length;
		const [page, setPage] = state;
		this.currentPage = page;
		this.setCurrentPage = setPage;

		//React State
	}
}
