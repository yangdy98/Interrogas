USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Candidates_Delete]    Script Date: 5/1/2022 8:18:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Dongyoung Yang
-- Create date: 3/24/2022
-- Description: Delete by Id Procedure
-- Code Reviewer: David Wiltrout

-- MODIFIED BY: Dongyoung Yang
-- MODIFIED DATE: 3/24/2022
-- Code Reviewer:
-- Note:
-- =============================================

ALTER Proc [dbo].[Candidates_Delete]
 @Id int


AS

/*
-----Test Code ------

Declare @Id int = 1
Execute dbo.Candidates_DeleteById @Id

*/

BEGIN

DELETE FROM [dbo].[Candidates]
      WHERE Id = @Id
END


