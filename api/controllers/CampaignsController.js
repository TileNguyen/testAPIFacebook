/**
  @author TILE
  @create 08/12/2016
**/
'use strict';

const CampaignsController = {
  create: function (req, res) {
    var d = req.allParams();
    if (!d) return res.badRequest(ErrorService.DATA_REQUIRE);
    if (!d.name) return res.badRequest(ErrorService.NAME_REQUIRE);
    if (!d.objective) return res.badRequest(ErrorService.OBJECTIVE_REQUIRE);
    d.status = d.status || 'PAUSED';

    // call facebook api
    FacebookAPIService.create(d, function (err, data) {
      if (err || !data) return res.badRequest(ErrorService.SYSTEM);
      d.id = data.id;
      Campaigns.create(d, function (e, camp) {
        if (e || !camp) return res.badRequest(ErrorService.SYSTEM);
        return res.ok(camp);
      });
    });
  },
  getAllCampaigns: function (req, res) {
    FacebookAPIService.getAll(function (err, data) {
      if (err) return res.badRequest(ErrorService.SYSTEM);
      return res.ok(data);
    });
  },
  getCampaigns: function (req, res) {
    const id = req.param('id');
    if (!id) return res.badRequest(ErrorService.ID_REQUIRE);
    FacebookAPIService.getCampaigns(id, function (err, data) {
      if (err) return res.badRequest(ErrorService.SYSTEM);
      return res.ok(data);
    });
  }
};

module.exports = CampaignsController;
