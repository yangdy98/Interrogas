USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Candidates_SelectAllV2]    Script Date: 5/1/2022 8:19:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Dongyoung Yang
-- Create date: 3/25/2022
-- Description: Select All Procedure
-- Code Reviewer:

-- MODIFIED BY: Dongyoung Yang
-- MODIFIED DATE: 4/5/2022
-- Code Reviewer:
-- Note: Join with other tables. 
-- =============================================


ALTER Proc [dbo].[Candidates_SelectAllV2] 
	@pageIndex int,
	@pageSize int

AS
/*

-----Test Code ------

Declare @pageIndex int = 0
		,@pageSize int = 3
execute dbo.Candidates_SelectAllV2 @pageIndex, @pageSize
*/

BEGIN
	Declare @offset int =@pageIndex*@pageSize
SELECT [Id]
      ,[GivenName]
      ,[Surnames]
      ,[Gender]=(Select g.Name from dbo.GenderTypes as g where c.GenderTypeId=g.Id)
      ,[Age]
      ,[AvatarUrl]
      ,Party = (Select p.Name from dbo.Parties as p Where c.PartyId = p.Id)
      ,[ElectionId]
      ,[Status] =(Select s.Name from dbo.StatusType as s where c.StatusId = s.Id)
      ,[IsElected]
	  ,TotalCount = Count(1) Over()
      ,[DateCreated]
      ,[DateModified]


	FROM [dbo].[Candidates] as c
	Order By Id
		  Offset @offset Rows 
		  Fetch Next @pageSize Rows Only 

	END

