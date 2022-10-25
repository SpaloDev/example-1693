/**
 * SFDC Webhook Sample
 */

require('dotenv').config();

exports.exampleDatasetBarcode = async (req, res) => {

  // check by webhookKey
  if (req.body.webhookKey) {

    if (req.body.webhookKey !== process.env.SPALO_WEBHOOK_KEY) {
      console.log('webhookKey Error');
      return res.status(401).send('Unauthorized')
    }

  } else {

    // for verification
    return res.send('OK')

  }

  const event = req.body.event;
  const body = req.body;
  if (event === 'DATASET') {
    try {
      for(var i=0;i<body.data.length;i++){
        if(body.data[i]['type'] === 'barcode'){
          const stringArray = body.data[i]['value'].split(',')
          const lastString = stringArray[stringArray.length -1];
          const actions = [{'key':'商品名','value':lastString}];
          const response = {'type':'dataset','actions':actions};
          res.send(response);
        }
      }
    } catch(e) {
      console.dir(e);
      return res.status(401).send('データ設定エラー：外部データ設定に失敗しました。')
    }
  }
};
