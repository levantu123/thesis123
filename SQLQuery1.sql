CREATE TABLE [dbo].[Survey] (
    [SurveyID]         INT           NOT NULL,
    [SurveyName]       NVARCHAR (40) NOT NULL,
    [SupplierID]       INT           NULL,
    [CategoryID]       INT           NULL,
    [NumberOfQuestion] INT           NULL,
    [SurveyJson]       NVARCHAR (1)  NULL,
    [Discontinued]     BIT           NOT NULL
);

