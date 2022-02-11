function downloadSelectedDeviceQRcode() {
    let QRcodeJson = [];
    for (let i of ui.selecedDeviceList) {
        QRcodeJson.push(i.id);
    }

    axios({
        method: 'POST',
        url: 'http://182.150.116.22:10008/api/v1/manual/download/qrcode',
        data: QRcodeJson,
        responseType: 'blob',
        header: {
            'Content-Type': 'application/x-download'
        }
    }).then(res => {
        const blob = new Blob([res.data], { type: 'application/zip' });
        const fileName = '所选设备二维码';
        const downLink = document.createElement('a');
        downLink.download = fileName;
        downLink.style.display = 'none';
        downLink.href = URL.createObjectURL(blob);
        document.body.appendChild(downLink);
        downLink.click();
        URL.revokeObjectURL(blob);
        document.body.removeChild(downLink);
    });
}