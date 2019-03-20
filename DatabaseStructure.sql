USE [OnlineEducation]
GO
/****** Object:  Table [dbo].[ChucVu]    Script Date: 3/20/2019 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChucVu](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TenChucVu] [nvarchar](50) NULL,
 CONSTRAINT [PK_ChucVu] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GiangVien]    Script Date: 3/20/2019 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GiangVien](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[HoTen_GV] [nvarchar](50) NULL,
	[NgaySinh] [date] NULL,
	[Anh] [nvarchar](200) NULL,
	[SDT] [nvarchar](15) NULL,
	[Email] [nvarchar](50) NULL,
	[NgayTao] [date] NULL,
	[DiaChi] [nvarchar](50) NULL,
	[MoTa] [nvarchar](max) NULL,
	[SoGioGiang] [int] NULL,
	[Luong] [decimal](18, 0) NULL,
	[MaKhoaHoc] [int] NULL,
	[IDTaiKhoan] [int] NULL,
 CONSTRAINT [PK_GiangVien] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HocVien]    Script Date: 3/20/2019 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HocVien](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[HoTen] [nvarchar](50) NOT NULL,
	[NgaySinh] [date] NOT NULL,
	[SDT] [nvarchar](15) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[NgayTao] [date] NULL,
	[DiaChi] [nvarchar](50) NULL,
	[ChuyenCan] [int] NULL,
	[DiemDanhGia] [real] NULL,
	[HocPhi] [decimal](18, 0) NULL,
	[IDTaiKhoan] [int] NULL,
 CONSTRAINT [PK_HocVien] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HocVien_KhoaHoc]    Script Date: 3/20/2019 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HocVien_KhoaHoc](
	[IDKhoaHoc] [int] NOT NULL,
	[IDHocVien] [int] NOT NULL,
	[NgayDangKy] [date] NULL,
 CONSTRAINT [PK_HocVien_KhoaHoc] PRIMARY KEY CLUSTERED 
(
	[IDKhoaHoc] ASC,
	[IDHocVien] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KhoaHoc]    Script Date: 3/20/2019 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhoaHoc](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TenKhoaHoc] [nvarchar](200) NULL,
	[MoTa] [nvarchar](max) NULL,
	[Anh] [nvarchar](200) NULL,
	[HocPhi] [decimal](18, 0) NULL,
	[ThoiGianBatDau] [date] NULL,
	[ThoiGianKetThuc] [date] NULL,
	[LichHoc] [nvarchar](max) NULL,
	[MetaTitle] [nvarchar](200) NULL,
	[IDLoaiKhoaHoc] [int] NULL,
	[IDGiangVien] [int] NULL,
 CONSTRAINT [PK_KhoaHoc] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LoaiKhoaHoc]    Script Date: 3/20/2019 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoaiKhoaHoc](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TenLoaiKhoaHoc] [nvarchar](50) NULL,
	[MoTa] [nvarchar](max) NULL,
	[MetaTitle] [nvarchar](200) NULL,
 CONSTRAINT [PK_LoaiKhoaHoc] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 3/20/2019 2:58:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaiKhoan](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TenDangNhap] [nvarchar](50) NULL,
	[MatKhau] [nvarchar](50) NULL,
	[NgayTao] [date] NULL,
	[TrangThai] [int] NULL,
	[IDChucVu] [int] NULL,
 CONSTRAINT [PK_TaiKhoan] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ChucVu] ON 

INSERT [dbo].[ChucVu] ([ID], [TenChucVu]) VALUES (1, N'Admin')
INSERT [dbo].[ChucVu] ([ID], [TenChucVu]) VALUES (2, N'Giảng viên')
INSERT [dbo].[ChucVu] ([ID], [TenChucVu]) VALUES (3, N'Học viên')
SET IDENTITY_INSERT [dbo].[ChucVu] OFF
SET IDENTITY_INSERT [dbo].[TaiKhoan] ON 

INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (2, N'quocthai', N'quocthai123', NULL, 1, 1)
INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (3, N'huuthi', N'huuthi123', NULL, 1, 1)
INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (4, N'thanhha', N'thanhha123', NULL, 1, 2)
INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (5, N'quockhanh', N'quockhanh123', NULL, 1, 3)
SET IDENTITY_INSERT [dbo].[TaiKhoan] OFF
ALTER TABLE [dbo].[GiangVien]  WITH CHECK ADD  CONSTRAINT [FK_GiangVien_TaiKhoan] FOREIGN KEY([IDTaiKhoan])
REFERENCES [dbo].[TaiKhoan] ([ID])
GO
ALTER TABLE [dbo].[GiangVien] CHECK CONSTRAINT [FK_GiangVien_TaiKhoan]
GO
ALTER TABLE [dbo].[HocVien]  WITH CHECK ADD  CONSTRAINT [FK_HocVien_TaiKhoan] FOREIGN KEY([IDTaiKhoan])
REFERENCES [dbo].[TaiKhoan] ([ID])
GO
ALTER TABLE [dbo].[HocVien] CHECK CONSTRAINT [FK_HocVien_TaiKhoan]
GO
ALTER TABLE [dbo].[HocVien_KhoaHoc]  WITH CHECK ADD  CONSTRAINT [FK_HocVien_KhoaHoc_HocVien] FOREIGN KEY([IDHocVien])
REFERENCES [dbo].[HocVien] ([ID])
GO
ALTER TABLE [dbo].[HocVien_KhoaHoc] CHECK CONSTRAINT [FK_HocVien_KhoaHoc_HocVien]
GO
ALTER TABLE [dbo].[HocVien_KhoaHoc]  WITH CHECK ADD  CONSTRAINT [FK_HocVien_KhoaHoc_KhoaHoc] FOREIGN KEY([IDKhoaHoc])
REFERENCES [dbo].[KhoaHoc] ([ID])
GO
ALTER TABLE [dbo].[HocVien_KhoaHoc] CHECK CONSTRAINT [FK_HocVien_KhoaHoc_KhoaHoc]
GO
ALTER TABLE [dbo].[KhoaHoc]  WITH CHECK ADD  CONSTRAINT [FK_KhoaHoc_LoaiKhoaHoc] FOREIGN KEY([IDLoaiKhoaHoc])
REFERENCES [dbo].[LoaiKhoaHoc] ([ID])
GO
ALTER TABLE [dbo].[KhoaHoc] CHECK CONSTRAINT [FK_KhoaHoc_LoaiKhoaHoc]
GO
ALTER TABLE [dbo].[TaiKhoan]  WITH CHECK ADD  CONSTRAINT [FK_TaiKhoan_ChucVu] FOREIGN KEY([IDChucVu])
REFERENCES [dbo].[ChucVu] ([ID])
GO
ALTER TABLE [dbo].[TaiKhoan] CHECK CONSTRAINT [FK_TaiKhoan_ChucVu]
GO
