import GameObject from './GameObject';
import Scene from './Scene';

export type TFontStyle = 'normal' | 'italic' | 'cursive' | 'bold';
export type TDataSymbol = {
    symbol:string,
    row: number,
    idx: number,
    x: number,
    y: number,
    width: number,
    height: number
}
const delimiter = [' ', '-', '_', ''];

export default class Text extends GameObject {
    private _text: string[] = [];
    private _fontSize = 12;
    private _fontFamely = 'Arial';
    private _fontStyle: TFontStyle = 'normal';
    private _isStrokeText = false;
    private _color = 'black';
    private _maxWidth = 0;
    private _fontBoundingBoxDescent = 0;
    private _heightLine = 0;
    private _delimiterIdx = 0;
    inRow: number[] = [];
    //private _fontStretch = '';
    constructor(scene: Scene, text = '', x = 0, y = 0, width?: number) {
        super(scene, 'text', 'Text', x, y);
        if (width) {
            this._maxWidth = width;
        }
        this.text = text;
    }

    private _toMaxWidth2(arr: string[]) {
        const widths: number[] = [];
        const splitedArr: string[] = [];
        let over = '';
        let allHeight = 0;
        let idxesSplit = [0];
        let text = '';
        let numCycles = 0;
        for (let i = 0; i < arr.length; i++) {
            const part = arr[i];
            text += part;
            if (i > 0 && i < arr.length) {
                text += delimiter[this._delimiterIdx];
            }

            const data = this.scene.ctx!.measureText(text);
            const width = data.width + data.actualBoundingBoxDescent;
            //console.log('width = ', width);
            if (this._heightLine === 0) {
                this._heightLine = data.fontBoundingBoxAscent;
                allHeight = this._heightLine;
            }

            //console.log('allHeight = ', allHeight);

            if (width > this._maxWidth && this._maxWidth > 0) {
                idxesSplit.push(i);
                allHeight += data.fontBoundingBoxAscent;
                text = '';
                widths.push(this._maxWidth);
                i--;
                if (i < 0) {
                    idxesSplit = [0];
                    numCycles = 1;
                }
                numCycles++;
                if (numCycles === 2) {
                    //console.log('konchit cikl!!!!');
                    this._delimiterIdx++;
                    break;
                }
            } else {
                numCycles = 0;
                widths.push(width);
            }
        }

        if (numCycles === 2) {
            //console.log('calc over');
            const last = idxesSplit.splice(idxesSplit.length - 1, 1)[0];
            over = arr.slice(last).join(delimiter[this._delimiterIdx]);
        }

        idxesSplit.forEach((idx, i) => {
            if (idxesSplit.length > i + 1) {
                //console.log(idx);
                splitedArr.push(arr.slice(idx, idxesSplit[i + 1]).join(delimiter[this._delimiterIdx]) + delimiter[this._delimiterIdx]);
            } else {
                //console.log('last = ',idx);
                splitedArr.push(arr.slice(idx).join(delimiter[this._delimiterIdx]));
            }
        });

        //console.log('idxesSplit =', idxesSplit);
        return { splitedArr, over, allHeight, widths };
    }

    private _toMaxWidth(arr: string[]) {
        const widths: number[] = [];
        const splitedArr: string[] = [];
        let over = '';
        let allHeight = 0;
        let idxesSplit = [0];
        let idxSplit = 0;
        let text = '';
        let prevText = '';
        let prevWidth = 0;
        let numCycles = 0;
        for (let i = 0; i < arr.length; i++) {
            const word = arr[i];
            text += word;

            if (i > 0 && i < arr.length && numCycles === 0) {
                text += delimiter[this._delimiterIdx];
                //prevText+= delimiter[this._delimiterIdx];
            }
            //text+=word;
            const data = this.scene.ctx!.measureText(text);
            const width = data.width + data.actualBoundingBoxDescent;

            if (this._heightLine === 0) {
                this._heightLine = data.fontBoundingBoxAscent;
                //allHeight = this._heightLine;
            }
            if (this._maxWidth > 0 && width > this._maxWidth && i > 0) {
                // splitText.push(words.slice(idxSplit,i-1).join(' '));
                // idxSplit = i+1;

                idxesSplit.push(i);
                //idxSplit = i;
                allHeight += data.fontBoundingBoxAscent;
                //console.log('prevText = ', prevText);
                //splitedArr.push(prevText);
                //console.log('ne vlazit = ', idxesSplit);
                //idxesSplitNum.push(i-idxesSplit[idxesSplit.length-2]);
                text = '';
                //prevText = '';
                //widths.push(prevWidth);
                //allHeight += data.fontBoundingBoxAscent;
                i--;
                if (i < idxesSplit[idxesSplit.length - 1]) {
                    numCycles++;
                    if (numCycles === 2) {
                        //console.log('konchit cikl!!!!');
                        this._delimiterIdx++;
                        break;
                    }
                } else {
                    numCycles = 0;
                }
            } else {
                // if(numCycles===1){
                //     splitedArr.push(text);
                //     allHeight += data.fontBoundingBoxAscent;
                //     widths.push(width);
                //     if(this._delimiterIdx!==0){
                //         this._delimiterIdx = 0;
                //         break;
                //     }
                //     continue;
                // }
                //prevText+= word;
                widths.push(width);
                //this._delimiterIdx = 0;
            }

            //prevWidth = width;
        }
        if (numCycles === 2) {
            //console.log('calc over');
            const last = idxesSplit.splice(idxesSplit.length - 1, 1)[0];
            over = arr.slice(last).join(delimiter[this._delimiterIdx]);
        }

        idxesSplit.forEach((idx, i) => {
            if (idxesSplit.length > i + 1) {
                //console.log(idx);
                splitedArr.push(arr.slice(idx, idxesSplit[i + 1]).join(' '));
            } else {
                //console.log('last = ', idx);
                splitedArr.push(arr.slice(idx).join(' '));
            }
        });
        // if(numCycles===2){
        //     over = arr.slice(idxSplit).join(delimiter[this._delimiterIdx])
        // }
        //console.log('splitedArr =', splitedArr);
        return { splitedArr, over, allHeight, widths };
    }

    getArrSymbolData():(TDataSymbol[])[] {
        const arr:(TDataSymbol[])[] = [];
        let width = 0;
        let height = 0;
        let lineHeight = 0;
        let prevWidth = 0;
        let prevHeight = 0;
        for (let i = 0; i < this._text.length; i++) {
            const row = this._text[i];
            let text = '';
            const dataRow:TDataSymbol[] = [];
            for (let j = 0; j < row.length; j++) {
                const symbol = row[j];
                text += symbol;
                const data = this.scene.ctx!.measureText(text);
                if(lineHeight===0){
                    lineHeight += data.fontBoundingBoxAscent;
                    height+=lineHeight;
                    //prevHeight = height;
                }
                width = data.width + data.actualBoundingBoxDescent;
                const symbolData:TDataSymbol = {
                    symbol,
                    row: i,
                    idx: j,
                    x: prevWidth,
                    y: prevHeight,
                    width: width - prevWidth,
                    height: height - prevHeight
                }
                dataRow.push(symbolData);
                prevWidth = width;  
            }
            prevHeight = height;
            height+=lineHeight;
            arr.push(dataRow);
        }
        return arr;
    }

    private _calcBox() {
        this.scene.ctx?.save();
        this.scene.ctx!.font = `${this._fontSize}px '${this._fontFamely}', ${this._fontStyle}`;
        let isComplate = false;
        let words = this.text.split(delimiter[this._delimiterIdx]);
        let tepmText: string[] = [];
        //console.log('words = ', words);
        let allHeightO = 0;
        this._heightLine = 0;
        let widthsO: number[] = [];
        while (!isComplate) {
            const { splitedArr, over, allHeight, widths } = this._toMaxWidth2(words);
            //console.log('widths = ',widths);
            tepmText = tepmText.concat(splitedArr);
            allHeightO += allHeight;
            widthsO = widthsO.concat(widths);
            //console.log('over = ',over.length);
            if (over.length === 0) {
                isComplate = true;
            }


            if (this._delimiterIdx > delimiter.length) {
                isComplate = true;
            } else {
                words = over.split(delimiter[this._delimiterIdx]);
            }
        }
        this._delimiterIdx = 0;
        this._text = tepmText;
        //console.log('widthsO = ', widthsO);
        const maxWidth = Math.max(...widthsO);
        this.width = maxWidth;
        this.height = allHeightO;

        //console.log('w = ', this.width, 'h = ', this.height);

        const dataFirst = this.scene.ctx!.measureText(this._text[0]);
        this._fontBoundingBoxDescent = dataFirst.fontBoundingBoxDescent;
        this.y = this.y + this._heightLine - dataFirst.fontBoundingBoxDescent;

        this.scene.ctx?.restore();
    }

    set text(val: string) {
        this._text = [val];
        this.y = this.y - this._heightLine + this._fontBoundingBoxDescent;
        //console.log('set text = ');
        this._calcBox();
        // this.scene.ctx?.save();
        // this.scene.ctx!.font = `${this._fontSize}px '${this._fontFamely}', ${this._fontStyle}`;
        // const data = this.scene.ctx!.measureText(val);
        // this.width = data.width+data.actualBoundingBoxDescent;
        // this.height = data.actualBoundingBoxAscent;
        // this.scene.ctx?.restore();
    }

    get text() {
        return this._text.join(' ');
    }

    get maxWidth() {
        return this._maxWidth;
    }

    set maxWidth(val: number) {
        this._maxWidth = val;
        this._calcBox();
    }

    set color(val: string) {
        this._color = val;
    }

    set fontSize(val: number) {
        this._fontSize = val;
        this.y = this.y - this.height + this._fontBoundingBoxDescent;
        this._calcBox();
    }

    get fontSize() {
        return this._fontSize;
    }

    set fontFamely(val: string) {
        this._fontFamely = val;
        this.y = this.y - this.height + this._fontBoundingBoxDescent;
        this._calcBox();
    }

    get fontFamely() {
        return this._fontFamely;
    }

    set fontStyle(val: TFontStyle) {
        this._fontStyle = val;
        this._calcBox();
    }

    get fontStyle() {
        return this._fontStyle;
    }

    render() {
        //console.log('_text = ', this._text);
        const cameraPoint = this.scene.game.camera.cameraPoint();
        this._text.forEach((t, i) => {
            this.scene.ctx?.save();
            const y = this.y + this._heightLine * i + cameraPoint.y;
            this.scene.ctx?.translate(this.x + cameraPoint.x, y);
            this.scene.ctx?.rotate(this.pi * this.angle);
            this.scene.ctx?.translate(-(this.x + cameraPoint.x), -(y));
            this.scene.ctx!.globalAlpha = this.alpha;
            //this.scene.ctx!.font = "expanded 66px 'Press Start 2P', cursive";
            this.scene.ctx!.font = `${this._fontSize}px '${this._fontFamely}', ${this._fontStyle}`;
            if (this._isStrokeText) {
                this.scene.ctx!.strokeStyle = this._color;
                this.scene.ctx?.strokeText(t, this.x + cameraPoint.x, y);
            } else {
                this.scene.ctx!.fillStyle = this._color;
                this.scene.ctx?.fillText(t, this.x + cameraPoint.x, y);
            }
            //this.scene.ctx?.drawImage(this.image, this.center.x, this.center.y, this.width, this.height);
            //console.log('text = ', this.text);
            this.scene.ctx?.restore();
        });

    }
}