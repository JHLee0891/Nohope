// LocalStorage 에 저장할 MovieData를 정형화
export class LSMovieData {
    constructor(itemType) {
        this._itemType = itemType;
        const value = new Array();
        const localData = JSON.parse(localStorage.getItem(itemType));
        if (localData !== null) {
            this._movieData = value.concat(localData);
        }
        else {
            this._movieData = value;
        }
    }

    initLocalStorage = () => {
        localStorage.setItem(this._itemType, JSON.stringify(this._movieData));
    }

    deleteData = (deleteValue) => {
        const deleteIndex = this._movieData.findIndex((element) => element.id === deleteValue.id);
        this._movieData.splice(deleteIndex, 1);
        this.initLocalStorage();
    }

    insertData = (id, ...data) => {
        const Data = {
            id:id,
            data:data
        };
        if (!this._movieData.find((element) => element.id === id)) {
            if (this._movieData.length >= 5) {
                this._movieData.shift();
            }
            this._movieData.push(Data);
        }
        else {
            this.deleteData(Data);
            this._movieData.push(Data);
        }
        this.initLocalStorage();
    }
}