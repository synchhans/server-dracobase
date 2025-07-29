import Recent from "../models/Recent.js";
import Workspace from "../models/Workspace.js";
import mongoose from "mongoose";

export const searchWorkspacesByDosen = async (filters) => {
  const { search, minProgress, maxProgress } = filters;

  const pipeline = [];

  if (search) {
    pipeline.push({
      $match: {
        name: { $regex: search, $options: "i" },
      },
    });
  }

  pipeline.push({
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "mahasiswa",
    },
  });

  pipeline.push({
    $lookup: {
      from: "userprogresses",
      localField: "_id",
      foreignField: "workspaceId",
      as: "progress",
    },
  });

  pipeline.push({
    $lookup: {
      from: "languages",
      localField: "language",
      foreignField: "_id",
      as: "languageDetails",
    },
  });

  pipeline.push({ $unwind: "$mahasiswa" });
  pipeline.push({ $unwind: "$progress" });
  pipeline.push({ $unwind: "$languageDetails" });

  pipeline.push({
    $project: {
      workspaceId: "$_id",
      workspaceName: "$name",
      mahasiswa: {
        _id: "$mahasiswa._id",
        displayName: "$mahasiswa.displayName",
        email:
          "$mahasiswa.googleEmail" ||
          "$mahasiswa.githubEmail" ||
          "$mahasiswa.email",
        picture:
          "$mahasiswa.googlePicture" ||
          "$mahasiswa.githubPicture" ||
          "$mahasiswa.picture",
      },
      progressPercentage: {
        $cond: {
          if: { $gt: [{ $size: "$languageDetails.materials" }, 0] },
          then: {
            $multiply: [
              {
                $divide: [
                  { $size: "$progress.completedMaterialIndexes" },
                  { $size: "$languageDetails.materials" },
                ],
              },
              100,
            ],
          },
          else: 0,
        },
      },
    },
  });

  const numericMinProgress = parseFloat(minProgress);
  const numericMaxProgress = parseFloat(maxProgress);
  if (!isNaN(numericMinProgress) || !isNaN(numericMaxProgress)) {
    const progressFilter = {};
    if (!isNaN(numericMinProgress)) progressFilter.$gte = numericMinProgress;
    if (!isNaN(numericMaxProgress)) progressFilter.$lte = numericMaxProgress;
    pipeline.push({ $match: { progressPercentage: progressFilter } });
  }

  pipeline.push({ $sort: { workspaceName: 1 } });

  try {
    const results = await Workspace.aggregate(pipeline);
    return results;
  } catch (error) {
    console.error("Error in searchWorkspacesByDosen service:", error);
    throw new Error("Gagal melakukan pencarian workspace mendalam.");
  }
};

export const getRecentWorkspaces = async (filters) => {
  const { search, minProgress, maxProgress, page = 1, limit = 10 } = filters;
  const skip = (page - 1) * limit;

  const pipeline = [
    { $sort: { accessedAt: -1 } },

    {
      $lookup: {
        from: "workspaces",
        localField: "workspaceId",
        foreignField: "_id",
        as: "workspaceDetails",
      },
    },
    { $unwind: "$workspaceDetails" },

    search
      ? {
          $match: {
            "workspaceDetails.name": { $regex: search, $options: "i" },
          },
        }
      : { $match: {} },

    {
      $group: {
        _id: "$workspaceId",
        userId: { $first: "$userId" },
        languageId: { $first: "$languageId" },
        accessedAt: { $max: "$accessedAt" },
        workspaceDetails: { $first: "$workspaceDetails" },
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "mahasiswa",
      },
    },

    {
      $lookup: {
        from: "userprogresses",
        localField: "_id",
        foreignField: "workspaceId",
        as: "progress",
      },
    },

    {
      $lookup: {
        from: "languages",
        localField: "languageId",
        foreignField: "_id",
        as: "languageDetails",
      },
    },

    { $unwind: "$mahasiswa" },
    { $unwind: "$progress" },
    { $unwind: "$languageDetails" },

    // { $match: { "mahasiswa.status": "active" } },

    {
      $addFields: {
        progressPercentage: {
          $cond: {
            if: { $gt: [{ $size: "$languageDetails.materials" }, 0] },
            then: {
              $multiply: [
                {
                  $divide: [
                    { $size: "$progress.completedMaterialIndexes" },
                    { $size: "$languageDetails.materials" },
                  ],
                },
                100,
              ],
            },
            else: 0,
          },
        },
      },
    },

    {
      $match: {
        $and: [
          minProgress
            ? { progressPercentage: { $gte: parseFloat(minProgress) } }
            : {},
          maxProgress
            ? { progressPercentage: { $lte: parseFloat(maxProgress) } }
            : {},
        ],
      },
    },
  ];

  const countPipeline = [...pipeline, { $count: "total" }];

  const dataPipeline = [
    ...pipeline,
    { $sort: { accessedAt: -1 } },
    {
      $project: {
        _id: 0,
        workspaceId: "$_id",
        workspaceName: "$workspaceDetails.name",
        lastAccessed: "$accessedAt",
        mahasiswa: {
          _id: "$mahasiswa._id",
          displayName: "$mahasiswa.displayName",
          email:
            "$mahasiswa.googleEmail" ||
            "$mahasiswa.githubEmail" ||
            "$mahasiswa.email",
          picture:
            "$mahasiswa.googlePicture" ||
            "$mahasiswa.githubPicture" ||
            "$mahasiswa.picture",
        },
        progressPercentage: 1,
      },
    },
    { $skip: skip },
    { $limit: parseInt(limit) },
  ];

  try {
    const [totalResult, data] = await Promise.all([
      Recent.aggregate(countPipeline).exec(),
      Recent.aggregate(dataPipeline).exec(),
    ]);

    const total = totalResult.length > 0 ? totalResult[0].total : 0;

    return {
      data,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error in getRecentWorkspaces service:", error);
    throw new Error("Gagal mengambil data workspace terkini.");
  }
};
