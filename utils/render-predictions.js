export const renderPredictions = (predictions, ctx) => {
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
    const styl = "14px sans-serif"
    ctx.font = styl
    ctx.textBaselibe = "top"

    predictions.forEach((prediction) => {
        const[x,y,width, height] = prediction["bbox"];

        const isPerson = prediction.class === "person";

        ctx.strokeStyle = isPerson ? "#F033FF" :"#00FFFF";
        ctx.lineWidth = 4;
        ctx.strokeRect(x,y,width,height);

        ctx.fillStyle = `rgba(255,0,0, ${isPerson ? 0.4 : 0})`;
        ctx.fillRect(x,y,width,height);

        ctx.fillStyle = isPerson ? "##F033FF" : "#00FFFF";
        const txtWidth = ctx.measureText(prediction.class).sidth;
        const txtHeight = parseInt(styl, 10);
        ctx.fillRect(x,y,txtWidth+ 4, txtHeight + 4);

        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class,x,y);
    });
};