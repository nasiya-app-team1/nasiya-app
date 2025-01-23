import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    type: String,
    description: "user's uefresh token for ugrade access token",
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkMDEyY2UwLTk1OTgtNDYzOC05MWIwLTA1ZDdiNmNhNTI4MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNzY0ODEyOSwiZXhwIjoxNzQwMjQwMTI5fQ.omUeZGMkS5E8_B5Trqvum8tAMWQXAvqyetXGQSmmVEs',
  })
  @IsNotEmpty()
  refresh_token: string;
}
