package music

import (
	"context"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
)

type Track struct {
	Number int
	Title  string
	File   string
}

var DefaultTracks = []Track{
	{Number: 1, Title: "System Startup Sequence", File: "01 - System Startup Sequence.wav"},
	{Number: 2, Title: "MD File", File: "02 - MD File.wav"},
	{Number: 3, Title: "The Agentic Layer", File: "03 - The Agentic Layer.wav"},
	{Number: 4, Title: "Penetration Testing Mantra", File: "04 - Penetration Testing Mantra.wav"},
	{Number: 5, Title: "The Encoder Tantric", File: "05 - The Encoder Tantric.wav"},
	{Number: 6, Title: "Flow State Activated", File: "06 - Flow State Activated.wav"},
	{Number: 7, Title: "Goal in Focus", File: "07 - Goal in Focus.wav"},
	{Number: 8, Title: "The Zen of Lyubov", File: "08 - The Zen of Lyubov.wav"},
	{Number: 9, Title: "Good Ole Boy Behind The Paywall", File: "09 - Good Ole Boy Behind The Paywall.wav"},
	{Number: 10, Title: "Like a Redteam Cartel", File: "10 - Like a Redteam Cartel.wav"},
	{Number: 11, Title: "Data Exfiltration", File: "11 - Data Exfiltration.wav"},
}

type Player struct {
	AudioDir string
	Command  string
	Volume   int
	Loop     bool
	Tracks   []Track
}

func (p *Player) trackSet() []Track {
	if len(p.Tracks) > 0 {
		return p.Tracks
	}
	return DefaultTracks
}

func (p *Player) commandName() string {
	if p.Command != "" {
		return p.Command
	}
	return "ffplay"
}

func (p *Player) resolve(track Track) (string, error) {
	if p.AudioDir == "" {
		return "", errors.New("audio directory is required")
	}
	path := filepath.Join(p.AudioDir, track.File)
	if _, err := os.Stat(path); err != nil {
		return "", err
	}
	return path, nil
}

func (p *Player) playOne(ctx context.Context, track Track) error {
	path, err := p.resolve(track)
	if err != nil {
		return err
	}

	args := []string{"-nodisp", "-autoexit", "-loglevel", "quiet"}
	if p.Volume > 0 {
		args = append(args, "-volume", strconv.Itoa(p.Volume))
	}
	args = append(args, path)

	cmd := exec.CommandContext(ctx, p.commandName(), args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}

func (p *Player) Run(ctx context.Context) error {
	tracks := p.trackSet()
	if len(tracks) == 0 {
		return errors.New("no tracks configured")
	}

	for {
		for _, track := range tracks {
			if err := p.playOne(ctx, track); err != nil {
				return fmt.Errorf("play %q: %w", track.Title, err)
			}
			if ctx.Err() != nil {
				return ctx.Err()
			}
		}
		if !p.Loop {
			return nil
		}
	}
}
