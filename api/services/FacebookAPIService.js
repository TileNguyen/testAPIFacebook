/**
  @author TILE
  @create 08/12/2016
**/
'use strict';

// request api
const request = require('request');

const url = 'https://graph.facebook.com/v2.7/act_354737858',
access_token = 'EAAPWepgZBkNABADRURUlb7Snm0715zWSL6cmZCusIeCPwqBipLi'+
'oGFNWouRhoOcOps7y3mvic7jFXSpB71hZBk2UHkYNC0wP2PnOvrXmz7vFf4Nf73pGmM7lAtbxKV9L8UdrMBshIKL1FEKpZAwhQXlddMwZA3up5Eejaq8Y1JQZDZD';
// Service
const FacebookAPIService = {
  create: function (data, cb) {
    request.post(
      {
        url: url+'/campaigns',
        form: {
          access_token: access_token,
          status: 'PAUSED',
          objective: data.objective,
          name: data.name
        }
      }
      , function (err, res, body) {
        if (err) return cb(ErrorService.FACE_API_ERROR);
        return cb(null, JSON.parse(body));
    });
  },
  getCampaigns: function (id, cb) {
    request.get(
      url+'/'+id+'?access_token='+access_token+'&fields=name,status'
      , function (err, res, body) {
        if (err) return cb(ErrorService.FACE_API_ERROR);
        return cb(null, JSON.parse(body));
    });
  },
  getAll: function (cb) {
    request.get(
      url+'/campaigns?access_token='+access_token+'&fields=name,status'
      , function (err, res, body) {
        if (err) return cb(ErrorService.FACE_API_ERROR);
        return cb(null, JSON.parse(body));
    });
  },
  createAdSet: function (data, cb) {
    // request.post(
    //   {
    //     url: url + '/adcampaigns',
    //     form: {
    //       access_token: access_token,
    //       name: data.name || ''
    //     }
    //   }, function (err, res, body) {
    //
    //   });
  }
};

module.exports = FacebookAPIService;
