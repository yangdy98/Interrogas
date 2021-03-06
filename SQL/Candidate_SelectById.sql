USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Candidates_Select_ById]    Script Date: 5/1/2022 8:18:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Dongyoung Yang
-- Create date: 3/24/2022
-- Description: Select by Id Procedure
-- Code Reviewer: David Wiltrout

-- MODIFIED BY: Dongyoung Yang
-- MODIFIED DATE: 3/24/2022
-- Code Reviewer:
-- Note:
-- =============================================



ALTER Proc [dbo].[Candidates_Select_ById]
	@Id int

AS
/*

-----Test Code ------

Declare @Id int = 1

Execute dbo.Candidates_Select_ById @Id


*/
BEGIN

SELECT [Id]
      ,[GivenName]
      ,[Surnames]
      ,[Gender]=(Select g.Name from dbo.GenderTypes as g where c.GenderTypeId=g.Id)
      ,[Age]
      ,[AvatarUrl]
      ,Party = (Select p.Name from dbo.Parties as p Where c.PartyId = p.Id)
      ,[ElectionType]=(Select e.Name from dbo.ElectionTypes as e Where c.ElectionId = e.Id)
      ,[Status] =(Select s.Name from dbo.StatusType as s where c.StatusId = s.Id)
      ,[IsElected]
      ,[DateCreated]
      ,[DateModified]


	FROM [dbo].[Candidates] as c
  Where Id = @Id


END


